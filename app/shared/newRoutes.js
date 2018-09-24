
const Home = require('./containers/HomepageContainer/component.jsx')
const Search = require('./containers/SearchPageContainer/component.jsx')
const DrugList = require('./containers/DrugListContainer/component.jsx')
const Drug = require('./containers/PageContainer/component.jsx')

import { fetchPage, fetchDrugList, fetchSearchTerm, receivePageError } from './actions'


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

function getSearchPage (nextState, replace, callback) {
  const term = nextState.params.term
  store.dispatch(fetchSearchTerm(term, '', 'should'))
    .then(() => {
      callback()
    }).catch(err => {
      console.log(err)
      // error pushed to state
      callback()
    })
}

function getDrugList (nextState, replace, callback) {
  console.log('hitting this ')
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

const routes = [{
  component: Home,
  routes: [
    {
      path: '/',
      exact: true,
      component: Home
    },
    {
      path: '/drug',
      component: DrugList,
      key: '2',
      exact: true,
      loadData: () => [
        getDrugList()
      ],
      routes: [{
        path: ':drugName',
        component: Drug,
        key: '3'
      }]
    },
    {
      path: '/search',
      component: Search,
      key: '4',
      exact: true,
      routes: [{
        path: '/:term',
        component: Search,
        key: '5'
      }]
    }
  ]
}]

export default routes
