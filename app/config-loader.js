'use strict'

var yaml = require('js-yaml')
var yimp = require('yaml-import')
var path = require('path')
var fs = require('fs')
var merge = require('merge')
var env = process.env.BUILD_CONFIG || 'development'

var baseConfig = {}
var envConfig = {}

function loadConfig (filename) {
  try {
    var src = fs.readFileSync(process.cwd() + filename, 'utf8')
    const schema = yimp.getSchema(path.join(process.cwd(), '../'))
    return yaml.safeLoad(src, { schema: schema })
  } catch (err) {
    if (err.name === 'YAMLException') {
      throw err
    }
  }
}

baseConfig = loadConfig('/../config.yaml')
envConfig = loadConfig('/../config.' + env + '.yaml')

baseConfig.buildTimestamp = Date.now()

var config = merge.recursive(true, baseConfig, envConfig)
console.log(config)
export { config }
