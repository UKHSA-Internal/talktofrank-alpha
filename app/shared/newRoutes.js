const routes = [{
  component: require('./containers/HomepageContainer/component.jsx'),
  exact: true,
  path: '/',
  key: '0',
  routes: [
    {
      path: '/drug',
      component: require('./containers/DrugListContainer/component.jsx'),
      key: '2',
      exact: true,
      routes: [{
        path: ':drugName',
        component: require('./containers/PageContainer/component.jsx'),
        key: '3'
      }]
    },
    {
      path: '/search',
      component: require('./containers/SearchPageContainer/component.jsx'),
      key: '4',
      exact: true,
      routes: [{
        path: '/:term',
        component: require('./containers/SearchPageContainer/component.jsx'),
        key: '5'
      }]
    }
  ]
}]

export default routes
