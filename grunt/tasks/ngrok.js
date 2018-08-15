const ngrok = require('ngrok')

module.exports = function (grunt) {
  grunt.registerTask('ngrok', 'Expose localhost to the web.', function () {
    this.async()
    const options = this.options()
    try {
      ngrok.connect(options.port).then((url) => {
        grunt.log.subhead(`\u2714 Tunnel to local server: ${url} pointing to port ${options.port}`)
      })
    } catch (e) {
      grunt.log.subhead(`\u2718 Could not create ngrok tunnel}`)
      done()
    }
  })
}
