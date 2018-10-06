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
//import { loadable } from 'loadable-components'
import routes from '../shared/newRoutes.jsx'

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
import { Switch, Route } from "react-router";

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes[0].routes)}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'))
