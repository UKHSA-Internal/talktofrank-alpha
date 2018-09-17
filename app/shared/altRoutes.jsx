import React from 'react'

import NoMatchContainer from './containers/NoMatchContainer/component.jsx'
import ServerError from './components/ServerError/component.jsx'
import TypographyContainer from './containers/TypographyContainer/component' // @todo @refactor @joel - remove this in due time - replace with generic static page handler
import DrugListContainer from './containers/DrugListContainer/component'
import HomepageContainer from './containers/HomepageContainer/component'

import { config } from 'config'

const Routes = [
  {
    path: '/',
    exact: true,
    component: HomepageContainer,
    slug: 'index'
  },
  {
    path: '/typography',
    exact: true,
    component: TypographyContainer,
    slug: 'typography'
  },
  {
    path: '/drug',
    exact: true,
    component: DrugListContainer
  },
  {
    component: NoMatchContainer
  }
]

export default Routes
