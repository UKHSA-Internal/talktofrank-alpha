module.exports = {
  options: {
    map: true,
    processors: [
      require('autoprefixer')({browsers: [
        'last 2 versions',
        'last 3 Chrome versions',
        'last 3 Firefox versions',
        '> 2% in CH',
        'IE >=9',
        'ExplorerMobile >= 9',
        'Opera 12',
        'Android >= 5.0'
      ]})
    ]
  },
  dist: {
    src: './static/ui/css/main.css'
  }
}
