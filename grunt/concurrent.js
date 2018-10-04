module.exports = {
  monitor: {
    tasks: ['nodemon', 'watch'],
    options: {
      logConcurrentOutput: true
    }
  },
  monitorTunnel: {
    tasks: ['nodemon', 'watch', 'ngrok'],
    options: {
      logConcurrentOutput: true,
      limit: 3
    }
  },
  js: {
    tasks: [
      'webpack:client',
      'webpack:server'
    ]
  }
}
