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
import routes from '../shared/newRoutes'


import('../shared/containers/PageContainer/component.jsx').then(VDApp => {
})
