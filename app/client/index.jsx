import { hydrate } from 'react-dom'
import React from 'react'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { app } from '../shared/reducers'
import { fetchPage } from '../shared/actions'
import thunkMiddleware from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'
import { loadComponents } from 'loadable-components'
import Routes from '../shared/newRoutes'

const rootReducer = combineReducers({
  app
})
let store = createStore(
  rootReducer,
  window.$REDUX_STATE,
  applyMiddleware(
    thunkMiddleware
  )
)

const history = createHistory()


  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(routes.routes)}
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app'))


/*
 * If there is an error, don't invoke the client app, the server will show it
 */
// if ( !store.getState().error  ) {
//   hydrate(routes, document.getElementById('app'))
// }
