module.exports = {
  options: {
    debugInfo: true,
    lineNumbers: true,
    sourceMap: true,
    includePaths: [
      'node_modules',
      'app/shared/components'
    ]
  },
  dist: {
    files: {
      './static/ui/css/main.css': './static/ui/scss/main.scss'
    }
  }
}
