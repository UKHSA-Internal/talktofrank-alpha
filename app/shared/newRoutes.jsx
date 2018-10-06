
import Search from './containers/SearchPageContainer/component.jsx'
//import DrugList from './containers/DrugListContainer/component.jsx'
//import Drug from './containers/PageContainer/component.jsx'
//import PageContainer from './containers/PageContainer/component.jsx'
import NoMatch from './components/NoMatch/component.jsx'
import Html from './components/Html/component.jsx'
//import Home from './containers/HomepageContainer/component.jsx'
//import Loadable from 'react-loadable';
import loadable from 'loadable-components'
import React from 'react'

import { fetchPage, fetchDrugList, fetchSearchTerm, receivePageError } from './actions'

const asyncHome = loadable(() => import('../shared/containers/HomepageContainer/component.jsx'))
const asyncDrugList = loadable(() => import('./containers/DrugListContainer/component.jsx'))
const asyncDrug = loadable(() => import('./containers/PageContainer/component.jsx'))

export default [
  {
    component: Html,
    routes: [
      {
        path: '/',
        exact: true,
        component: asyncHome
      },
      {
        path: '/drug',
        exact: true,
        component: asyncDrugList,
        loadData: () => {
          return fetchDrugList()
        }
      },
      {
        path: '/drug/:drugName',
        exact: true,
        component: asyncDrug,
        loadData: ({drugName}) => {
          return fetchPage(drugName)
        }
      },
      {
        component: NoMatch
      }
    ]
  }
]
