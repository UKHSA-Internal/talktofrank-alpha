'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import { RouterContext, match } from 'react-router'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import cookie from 'react-cookie'
import cookieParser from 'cookie-parser'
import { getRoutes } from '../shared/routes'
import { exists } from '../shared/utilities'
import { generateStore } from '../shared/store'

import Head from '../shared/components/Head/component.jsx'
import Scripts from '../shared/components/Scripts/component.jsx'
import Skiplinks from '../shared/components/Skiplinks/component.jsx'

/*
 * Express routes
 */
import apiRoutes from './api/v1/api.js'

/*
 * Project configuration
*/
import { config } from 'config'
import packageInfo from '../../package.json'

var store

const app = express()
const cacheBusterTS = Date.now()

app.use('/api/v1', apiRoutes)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static('../static'))
app.use(favicon('../static/ui/favicon.ico'))

app.get('/robots.txt', function (req, res) {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /')
})

/*
 * Pass Express over to the App via the React Router
 */
app.get('*', function (req, res) {
  store = generateStore()

  cookie.plugToRequest(req, res)

  match({routes: getRoutes(store), location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      // Error with routing
      res.status(500).send(error.message)
      return
    }

    if (redirectLocation) {
      // Handle redirects
      console.log('REDIRECTING TO: ' + redirectLocation.pathname + redirectLocation.search)
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      return
    }

    let componentHtml = ''
    let state = store.getState()

    try {
      componentHtml = ReactDOMServer.renderToString((
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      ))
    } catch (err) {
      console.log(err)
    }

    let title = 'Talk to Frank'

    if (state.error) {
      switch (state.error) {
        case '404':
          title = 'Page not found (404)'
          break
        case 500:
        default:
          title = 'Server error'
          break
      }
    } else if (exists(state, 'app.pageData.head.title')) {
      title = state.app.pageData.head.title
    }

    let status = state.error ? state.error : 200
    let skip = ReactDOMServer.renderToStaticMarkup(<Skiplinks />)
    let componentHead = ReactDOMServer.renderToStaticMarkup(<Head {...state.app.pageData} error={state.app.error} />)
    let componentScripts = ReactDOMServer.renderToStaticMarkup(<Scripts cacheTS={cacheBusterTS} />)

    let renderedHtml

    if ( renderProps.location.search === '?amp=1' ) {
      renderedHtml = renderFullPageHtmlAmp(skip, componentHtml, componentHead, componentScripts, JSON.stringify(state))
    }
    else {
      renderedHtml = renderFullPageHtml(skip, componentHtml, componentHead, componentScripts, JSON.stringify(state))
    }


    return res.status(status).send(renderedHtml)
  })
})

function renderFullPageHtmlAmp (skip, html, head, scripts, initialState) {
  return `
    <!doctype html>
    <html ⚡>
     <head>
       <meta charset="utf-8">
       <link rel="canonical" href="hello-world.html">
       <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
       <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
       <script async src="https://cdn.ampproject.org/v0.js"></script>
     </head>
     <body>Hello World!</body>
    </html>
  `
}

function renderFullPageHtml (skip, html, head, scripts, initialState) {
  return `
    <!DOCTYPE html>
    <html lang='en'>
    ${head}
    <body>
      ${skip}
      <div id='app'>${html}</div>
      <script>window.$REDUX_STATE=${initialState};</script>
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
