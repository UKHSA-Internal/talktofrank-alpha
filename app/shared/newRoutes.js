const routes = [{
  component: Root,
  exact: true,
  key: '0',
  routes: [
    {
      path: '/',
      exact: true,
      component: require('./containers/HomepageContainer/component.jsx'),
      key: '1'
    },
    {
      path: '/drug',
      component: require('./containers/DrugListContainer/component.jsx'),
      key: '2',
      exact: true,
      routes: [{
        path: ':drugName',
        component: require('./containers/PageContainer/component.jsx'),
        key: '3'
      }],
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
      }],
    },
    {
      path: '*',
      component: require('./containers/NoMatchContainer/component.jsx'),
      key: '6'
    },
  ],
}];

export default routes
