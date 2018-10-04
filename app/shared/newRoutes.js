
const Home = require('./containers/HomepageContainer/component.jsx')
const Search = require('./containers/SearchPageContainer/component.jsx')
const DrugList = require('./containers/DrugListContainer/component.jsx')
const Drug = require('./containers/PageContainer/component.jsx')
const NoMatch = require('./components/NoMatch/component.jsx')
const Html = require('./components/Html/component.jsx')

import { fetchPage, fetchDrugList, fetchSearchTerm, receivePageError } from './actions'

export default [
  {
    component: Html,
    routes: [
      {
        path: '/',
        exact: true,
        component: DrugList

      },
      {
        path: '/drug',
        exact: true,
        component: DrugList,
        loadData: () => {
          return fetchDrugList()
        }
      },
      {
        component: NoMatch
      }
    ]
  }
]
