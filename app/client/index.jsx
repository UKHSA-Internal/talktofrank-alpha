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

// import PageContainer from './containers/PageContainer/component'
// import TypographyContainer from './containers/TypographyContainer/component' // @todo @refactor @joel - remove this in due time - replace with generic static page handler
// import DrugListContainer from './containers/DrugListContainer/component'


// <Route path='/'>
//   <IndexRoute component={withFallback(PageContainer)} onEnter={getPage} slug='index'/>
//   <Route path='typography' component={withFallback(TypographyContainer)} onEnter={getPage} slug='typography' />
//   <IndexRoute component={withFallback(DrugListContainer)} onEnter={getDrugList} />
//   <Route path='drug'>
//     <IndexRoute component={withFallback(DrugListContainer)} onEnter={getDrugList} />
//     <Route path=':drugName' component={withFallback(PageContainer)} onEnter={getPage} />
//   </Route>
//   <Route path='*' component={withFallback(NoMatchContainer)} onEnter={getPage} slug='no-match' />
// </Route>



// export const routes = (
//   <Provider store={store}>
//     <Router history={browserHistory}>
//       <Route path='/'>
//         <IndexRoute getComponent={(location, callback) => {
//           import('../shared/containers/PageContainer/component.jsx').then((component) => {
//             callback(null, component);
//           }).catch(err => {
//             console.log(err);
//           })
//         }} />
//         <Route path='typography' getComponent={(location, callback) => {
//           import('../shared/containers/TypographyContainer/component.jsx').then((component) => {
//             callback(null, component);
//           }).catch(err => {
//             console.log(err);
//           })
//         }} />
//         <Route path='drug'>
//           <IndexRoute getComponent={(location, callback) => {
//             import('../shared/containers/DrugListContainer/component').then((component) => {
//               callback(null, component);
//             }).catch(err => {
//               console.log(err);
//             })
//           }} />
//           <Route path=':drugName' getComponent={(location, callback) => {
//             import('../shared/containers/PageContainer/component.jsx').then((component) => {
//               callback(null, component);
//             }).catch(err => {
//               console.log(err);
//             })
//           }} />
//         </Route>
//       </Route>
//     </Router>
//   </Provider>
// )




/*
* If there is an error, don't invoke the client app, the server will show it
*/
if (!store.getState().error) {
  render(routes, document.getElementById('app'))
}
