import { config } from 'config'

const express = require('express')
const yaml = require('js-yaml')
const fs = require('fs')
const bodyParser = require('body-parser')
const router = express.Router()

let templateId = ''

/**
 * Add middleware to parse json
 */

router.use(bodyParser.json())

/**
 * Get page data
 */

router.get('/pages/:slug', (req, res, next) => {
  if (!req.params.slug) {
    let error = new Error()
    error.status = 404
    next(error)
    return
  }

  try {
    var doc = yaml.safeLoad(fs.readFileSync('./static/' + req.params.slug + '.yml', 'utf8'))
  } catch (e) {
    next(e)
  }

  res.json(doc)
})

/**
 * Error handler
 */
router.use(function (err, req, res, next) {
  let status = err.status || 500

  /* eslint-disable */
  console.log(err);
  /* eslint-enable */

  let msg = err.message || err.stack || err.name || 'General error'

  res.status(status)
    .json({
      error: msg
    })
})

export default router
