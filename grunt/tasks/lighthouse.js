const chromeLauncher = require('chrome-launcher')
const lighthouse = require('lighthouse')

function launchChromeAndRunLighthouse (url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port
    return lighthouse(url, opts, config).then(results => {
      return chrome.kill().then(() => results.lhr)
    })
  })
}

module.exports = function (grunt) {
  grunt.registerMultiTask('lighthouse', 'Performance checker', function () {
    const done = this.async()

    const taskOptions = this.options({})

    const opts = {
      chromeFlags: ['--headless', '--no-sandbox'],
      onlyCategories: ['performance']
    }

    let promises = this.data.urls.map((url) => {
      return launchChromeAndRunLighthouse(url, opts)
    })

    Promise.all(promises).then(function (results) {
      let errors = false
      let total = 0

      results.forEach(result => {
        if (result.categories.performance.score < taskOptions.threshold) {
          let score = (result.categories.performance.score * 100)
          grunt.log.subhead(`\u2716 ${result.finalUrl} failed (${score}%)\n`)
          errors = true
          total++
        }
      })

      if (errors) {
        grunt.fail.warn(`${total} pages failed performance`, 3)
      }
      done()

    })
  })
}
