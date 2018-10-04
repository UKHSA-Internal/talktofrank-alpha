import React from 'react'
import { renderRoutes } from 'react-router-config'
import Skiplinks from '../Skiplinks/component.jsx'
import Scripts from '../Scripts/component.jsx'
import Head from '../Head/component.jsx'

const Html = ({route, initialState, cacheBusterTS}) => (
  <html lang='en'>
    <Head />
    <body>
      <Skiplinks />
      <div id='app'>
        {renderRoutes(route.routes)}
      </div>
      <script dangerouslySetInnerHTML={{__html: `window.$REDUX_STATE=${JSON.stringify(initialState)}`}} />
      <Scripts cacheBusterTS={cacheBusterTS} />
    </body>
  </html>
)

export default Html
