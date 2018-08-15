const pa11y = require('pa11y')

module.exports = function (grunt) {
  grunt.registerMultiTask('pa11y', 'Accessibility checker', function () {
    let done = this.async()



    let promises = this.data.urls.map((url) => {
      return pa11y(url, {
        chromeLaunchConfig: {
          args: ['--no-sandbox']
        }
      })
    })

    var total = 0
    let error = false

    Promise.all(promises).then(function (results) {
      results.forEach(result => {
        if (result.issues.length > 0) {
          grunt.log.subhead(`\u2716 ${result.pageUrl} failed\n`)

          result.issues.forEach(error => {
            grunt.log.error(grunt.log.table([10, 200], ['code', error.code]))
            grunt.log.error(grunt.log.table([10, 200], ['message', error.message]))
            grunt.log.error(grunt.log.table([10, 200], ['context', error.context]))
            grunt.log.writeln('')
            total++
          })
          error = true
        } else {
          grunt.log.subhead(`\u2714 ${result.pageUrl} ok`)
        }
      })

      if (error) {
        grunt.fail.warn(`${total} accessibility errors`, 3)
      }
      done()
    })
  })
}
