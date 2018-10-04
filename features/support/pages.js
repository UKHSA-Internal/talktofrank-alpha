const pages = {
  home: '/',
  aToZ: '/drug',
  drugPage: name => {
    return `/drug/${name}`
  }
};

module.exports = pages;