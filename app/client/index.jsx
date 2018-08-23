import { render } from 'react-dom'
import React from 'react'

import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import { app } from '../shared/reducers'
import { fetchPage } from '../shared/actions'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
  app
})
var store = createStore(
  rootReducer,
  window.$REDUX_STATE,
  applyMiddleware(
    thunkMiddleware
  )
)

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/'>
        <Route path='drug'>
          <IndexRoute getComponent={(location, callback) => {
            import('../shared/containers/DrugListContainer/component.jsx').then((component) => {
              callback(null, component);
            }).catch(err => {
              console.log(err);
            })
          }} />
          <Route path='search' getComponent={(location, callback) => {
            import('../shared/containers/SearchPageContainer/component.jsx').then((component) => {
              callback(null, component);
            }).catch(err => {
              console.log(err);
            })
          }} />
          <Route path='search-results' getComponent={(location, callback) => {
            import('../shared/containers/SearchResultsContainer/component.jsx').then((component) => {
              callback(null, component);
            }).catch(err => {
              console.log(err);
            })
          }} />
          <Route path=':drugName' getComponent={(location, callback) => {
            import('../shared/containers/PageContainer/component.jsx').then((component) => {
              callback(null, component);
            }).catch(err => {
              console.log(err);
            })
          }} />
        </Route>
        <IndexRoute getComponent={(location, callback) => {
          import('../shared/components/PageHome/component.jsx').then((component) => {
            callback(null, component);
          }).catch(err => {
            console.log(err);
          })
        }} />
        <Route path='*' getComponent={(location, callback) => {
          import('../shared/containers/NoMatchContainer/component.jsx').then((component) => {
            callback(null, component);
          }).catch(err => {
            console.log(err);
          })
        }} />
      </Route>
    </Router>
  </Provider>
)

/*
 * If there is an error, don't invoke the client app, the server will show it
 */
if ( !store.getState().error  ) {
  render(routes, document.getElementById('app'));
}

export default routes
