import { config } from 'config'
const debug = require(`debug`)(`contentful-webhook`)
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const ngrok = require('ngrok')
const ContentfulTextSearch = require('contentful-text-search')

const search = new ContentfulTextSearch({
  space: config.contentful.contentSpace,
  token: config.contentful.contentAccessToken,
  elasticHost: config.elasticsearch.host,
  contentType: config.contentful.contentTypes.drug
})

/**
 * Add middleware to parse json
 */

router.use(bodyParser.json({type: 'application/*'}))
/**
 * Get page data
 */
router.use('/', (req, res, next) => {
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
  res.send({ status: 'ACCEPTED' })
})

router.use(function (err, req, res, next) {
  let status = err.status || 500

  /* eslint-disable */
  console.log(err)
  /* eslint-enable */

  let msg = err.message || err.stack || err.name || 'General error'

  res.status(status)
    .json({
      error: msg
    })
})

export default router
