module.exports = {
  monitor: {
    tasks: ['nodemon', 'watch'],
    options: {
      logConcurrentOutput: true
    }
  },
  js: {
    tasks: ['webpack:client', 'webpack:server']
  }
}
