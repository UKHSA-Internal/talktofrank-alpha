const routes = [{
  routes: [
    {
      path: '/',
      exact: true,
      component: require('./containers/HomepageContainer/component.jsx'),
      slug: 'index'
    },
    {
      path: '/drug',
      component: require('./containers/DrugListContainer/component.jsx'),
      routes: [{
        path: ':drugName',
        component: require('./containers/PageContainer/component.jsx'),
      }],
    },
    {
      path: '/search',
      component: require('./containers/SearchPageContainer/component.jsx'),
      routes: [{
        path: '/:term',
        component: require('./containers/SearchPageContainer/component.jsx'),
      }],
    },
    {
      path: '*',
      component: require('./containers/NoMatchContainer/component.jsx'),
      slug: 'index'
    },
  ],
}];

export default routes
