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
import Routes from '../shared/routes'

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

// Get the initial state from server-side rendering
const initialState = window.__INITIAL_STATE__
const history = createHistory()

const render = (Routes) => {
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(Routes)}
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  )
}

// Load all components needed before starting rendering (loadable-components setup)
loadComponents().then(() => {
  render(routes)
})

/*
 * If there is an error, don't invoke the client app, the server will show it
 */
// if ( !store.getState().error  ) {
//   hydrate(routes, document.getElementById('app'))
// }

export default routes
