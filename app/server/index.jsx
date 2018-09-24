'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import { RouterContext, match } from 'react-router'
import { StaticRouter, Router, BrowserRouter, Switch, Route } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import cookie from 'react-cookie'
import cookieParser from 'cookie-parser'
// import { getRoutes } from '../shared/routes'
import routes from '../shared/newRoutes'
import { ConnectedRouter } from 'react-router-redux'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { exists } from '../shared/utilities'
import { generateStore } from '../shared/store'

import createMemoryHistory from 'history/createMemoryHistory'
import { getLoadableState } from 'loadable-components/server'
import Head from '../shared/components/Head/component.jsx'
import Scripts from '../shared/components/Scripts/component.jsx'
import Skiplinks from '../shared/components/Skiplinks/component.jsx'
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

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static('../static'))
app.use(favicon('../static/ui/favicon.ico'))

app.get('/robots.txt', function (req, res) {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /')
})

// Register server-side rendering middleware
app.get('*', (req, res) => {
  const history = createMemoryHistory()
  const store = generateStore()

  // The method for loading data from server-side
  const loadBranchData = () => {
    const page = matchRoutes(routes, req.path)
    const promises = page.map(({ route, match }) => {
      if (route.loadData) {
        return Promise.all(
          route
            .loadData({ params: match.params, getState: store.getState })
            .map(item => store.dispatch(item))
        )
      }

      return Promise.resolve(null)
    })

    return Promise.all(promises)
  }

  (async () => {
    try {
      // Load data from server-side first
      await loadBranchData()

      const staticContext = {}
      const AppComponent = (
        <Provider store={store}>
          <StaticRouter location={req.path} context={staticContext}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      )

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (staticContext.url) {
        res.status(301).setHeader('Location', staticContext.url)
        res.end()

        return
      }

      // Extract loadable state from application tree (loadable-components setup)
      getLoadableState(AppComponent).then(loadableState => {
        // const head = Helmet.renderStatic()
        let state = store.getState()
        let skip = ReactDOMServer.renderToStaticMarkup(<Skiplinks />)
        const head = ReactDOMServer.renderToStaticMarkup(<Head {...state.app.pageData} error={state.app.error} />)
        const htmlContent = ReactDOMServer.renderToString(AppComponent)
        const initialState = JSON.stringify(state)
        const loadableStateTag = loadableState.getScriptTag()
        let componentScripts = ReactDOMServer.renderToStaticMarkup(<Scripts cacheTS={cacheBusterTS} />)

        // Check page status
        const status = staticContext.status === '404' ? 404 : 200

        // Pass the route and initial state into html template
        res
          .status(status)
          .send(
            renderFullPageHtml(
              head,
              skip,
              htmlContent,
              componentScripts,
              initialState,
              loadableStateTag
            )
          )
      })
    } catch (err) {
      res.status(404).send('Not Found :(')

      console.error(`Rendering routes error: ${err}`)
    }
  })()
})

function renderFullPageHtml (head, skip, html, scripts, initialState, loadableStateTag) {
  return `
    <!DOCTYPE html>
    <html lang='en'>
    ${head}
    <body>
      ${skip}
      <div id='app'>${html}</div>
      ${loadableStateTag}
      <script>window.$REDUX_STATE=${initialState}</script>
      ${scripts}
    </body>
    </html>
  `
}

const port = process.env.PORT || 3000

var server = app.listen(port, () => {
  let host = server.address().address

  console.log('Compiled in ' + config.buildConfig + ' mode')
  console.log('NODE_ENV set to ' + process.env.NODE_ENV)
  console.log('BUILD_CONFIG set to ' + process.env.BUILD_CONFIG)

  console.log(packageInfo.name + ' app listening at http://%s:%s', host, port)
})
