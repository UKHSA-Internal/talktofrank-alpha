
import thunk from 'redux-thunk'
import { app } from '../shared/reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'

export function generateStore (intialState) {
  const rootReducer = combineReducers({
    app
  })
  return createStore(
    rootReducer,
    applyMiddleware(
      thunk
    )
  )
}
