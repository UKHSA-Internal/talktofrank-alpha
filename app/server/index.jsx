'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import { RouterContext, match } from 'react-router'
import { StaticRouter, Router, BrowserRouter, Switch, Route } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import routes from '../shared/newRoutes'
import { ConnectedRouter } from 'react-router-redux'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { exists } from '../shared/utilities'
import { generateStore } from '../shared/store'

import ContentfulTextSearch from 'contentful-text-search'
import * as path from 'path'

/*
 * Express routes
 */
import apiRoutes from './api/v1/api.js'
import contentFulWebhookRoutes from './contentful/webhooks.js'

/*
 * Project configuration
*/
import { config } from 'config'
import packageInfo from '../../package.json'

/*
 * Elasticsearch config
*/
const search = new ContentfulTextSearch({
  space: config.contentful.contentSpace,
  token: config.contentful.contentAccessToken,
  elasticHost: config.elasticsearch.host,
  contentType: config.contentful.contentTypes.drug
})

var store

const app = express()
const cacheBusterTS = Date.now()

const addSearch = (req, res, next) => {
  res.search = search
  return next()
}

// Add search middleware
app.use('/api/v1/search', addSearch)
app.use('/contentful/webhook', addSearch)

app.use('/api/v1', apiRoutes)
app.use('/contentful/webhook', contentFulWebhookRoutes)

/*
 * Adding service worker files direct to express callbacks
 */
app.use('/sw.js', (req, res) => {
  res.sendFile(path.resolve('../static/ui/js/sw.js'))
})
app.use('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve('../static/ui/js/service-worker.js'))
})

app.use(bodyParser.json())
app.use(express.static('../static'))
app.use(favicon('../static/ui/favicon.ico'))

app.get('/robots.txt', function (req, res) {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /')
})


// Register server-side rendering middleware
app.get('*', (req, res) => {

  const store = generateStore()

  // The method for loading data from server-side
  const loadData = () => {

    const branches = matchRoutes(routes, req.path)

    let match = branches.find(({ route, match }) => {
      return match.isExact && route.loadData
    })

    if ( !match ) {
      return Promise.resolve(null)
    }

    return store.dispatch(match.route.loadData())
  }

  (async () => {
    try {

      await loadData()

      const state = store.getState()
      const staticContext = {}

      const AppComponent = (
        <Provider store={store}>
          <StaticRouter location={req.path} context={staticContext}>
            {renderRoutes(routes, {
              initialState: state,
              cacheBusterTS: cacheBusterTS
            })}
          </StaticRouter>
        </Provider>
      )

      res.write('<!DOCTYPE html>')
console.log("TEST")
      ReactDOMServer
        .renderToNodeStream(AppComponent)
        .pipe(res)

    } catch (err) {
      console.log(err)
      // need to render the NoMatch component here
      res.status(404).send('Not Found :(')
    }
  })()
})

const port = process.env.PORT || 3000

var server = app.listen(port, () => {
  let host = server.address().address

  console.log('Compiled in ' + config.buildConfig + ' mode')
  console.log('NODE_ENV set to ' + process.env.NODE_ENV)
  console.log('BUILD_CONFIG set to ' + process.env.BUILD_CONFIG)

  console.log(packageInfo.name + ' app listening at http://%s:%s', host, port)
})
