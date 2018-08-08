import { render } from 'react-dom'
import React from 'react'
import { Route, Router, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import { getRoutes } from '../shared/routes'
import { generateStore } from '../shared/store'

let store = generateStore(window.$REDUX_STATE)

let routes = (
 <Provider store={store}>
   <Router history={browserHistory}>
      {getRoutes(store)}
   </Router>
 </Provider>
)

/*
* If there is an error, don't invoke the client app, the server will show it
*/
if (!store.getState().error) {
  render(routes, document.getElementById('app'))
}
