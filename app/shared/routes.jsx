import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { fetchPage, fetchDrugList, receivePageError } from './actions'

import NoMatchContainer from './containers/NoMatchContainer/component.jsx'
import ServerError from './components/ServerError/component.jsx'
import PageContainer from './containers/PageContainer/component'
import DrugListContainer from './containers/DrugListContainer/component'

import { config } from 'config'

/*
 * Render 404 / 500 errors
 */

let getRoutes = store => {
  function withFallback (WrappedComponent, selectData) {
    return class extends React.Component {
      render () {
        let state = store.getState()
        switch (state.error) {
          case 500:
            return <ServerError />
          case 404:
            return <NoMatchContainer />
          default:
            return <WrappedComponent {...this.props} />
        }
      }
    }
  }

  function getPage (nextState, replace, callback) {
    const slug = this.slug ? this.slug : nextState.params.drugName
    store.dispatch(fetchPage(slug))
      .then(() => {
        callback()
      }).catch(err => {
        console.log(err)
        // error pushed to state
        callback()
      })
  }

  function getDrugList (nextState, replace, callback) {
    store.dispatch(fetchDrugList())
      .then(() => {
        callback()
      }).catch(err => {
      console.log(err)
      // error pushed to state
      callback()
    })
  }

  function noMatchError (nextState, replace, callback) {
    store.dispatch(receivePageError(404))
    callback()
  }

  return (
    <Route path='/'>
      <IndexRoute component={withFallback(DrugListContainer)} onEnter={getDrugList} />
      <Route path='drug'>
        <IndexRoute component={withFallback(DrugListContainer)} onEnter={getDrugList} />
        <Route path=':drugName' component={withFallback(PageContainer)} onEnter={getPage} />
      </Route>
      <Route path='*' component={withFallback(NoMatchContainer)} onEnter={getPage} slug='no-match' />
    </Route>
  )
}

export { getRoutes }
