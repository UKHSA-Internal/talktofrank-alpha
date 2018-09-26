import { config } from 'config'

const debug = require(`debug`)(`contentful-webhook`)
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const Sentry = require('@sentry/node')

/**
 * Add middleware to parse json
 */
router.use(bodyParser.json({type: 'application/*'}))

/**
 * Get page data
 */
router.use('/', (req, res, next) => {
  try {
    const search = res.search
    debug('\nRequests header\n', req.headers)
    debug('\nRequests body\n', req.body)

    const webhookName = req.headers['x-contentful-topic']
    debug(`Webhook called ${webhookName}`)

    switch (webhookName) {
      case 'ContentManagement.Entry.publish' :
        search.indexer.indexSingleEntry(req.body)
        break

      case 'ContentManagement.Entry.unpublish' :
      case 'ContentManagement.Entry.delete' :
        search.indexer.deleteSingleEntry(req.body)
        break
    }

    res.status(202)
    res.send({status: 'ACCEPTED'})
  } catch (error) {
    error.status = 500
    return next(error)
  }
})

/**
 * Error handler
 */
router.use(function (err, req, res, next) {
  let status = err.status || 500

  /* eslint-disable */
  console.log(err)
  /* eslint-enable */

  let msg = err.message || err.stack || err.name || 'General error'

  if (config.sentry.logErrors) {
    Sentry.captureException(err)
  }

  res.status(status)
    .json({
      error: msg
    })
})

export default router
