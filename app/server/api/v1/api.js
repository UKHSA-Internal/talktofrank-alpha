import { config } from 'config'

const express = require('express')
const yaml = require('js-yaml')
const fs = require('fs')
const bodyParser = require('body-parser')
const util = require('util')
const marked = require('marked')
const router = express.Router()
const sortBy = require('lodash.sortby')
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ddde134cf3f45d080ed01144bc1db5074caa49a077d04ba51e69c9a69d5f4682'

/**
 * Add middleware to parse json
 */

router.use(bodyParser.json())

/**
 * Get page data
 */
router.get('/drugList', (req, res, next) => {

  try {
    let lookupUrl = config.contentful.contentHost + '/spaces/%s/entries?content_type=%s'
    let pageUrl = util.format(lookupUrl, config.contentful.contentSpace, config.contentful.contentTypes.drug)
    axios.get(pageUrl).then(json => {

      if (json.data.total === 0) {
        let error = new Error()
        error.status = 404
        return next(error)
      }

      let response = {
        list: []
      }
      json.data.items.map((item) => {
        response.list[response.list.length] = {
          name: item.fields.name.toLowerCase(),
          slug: `/drug/${item.fields.slug}`
        }

        item.fields.synonyms.split(',').map(synonym => {
          response.list[response.list.length] = {
            name: synonym.trim().toLowerCase(),
            slug: `/drug/${item.fields.slug}`,
            parent: item.fields.name
          }
        })

      })
      response.list = sortBy(response.list, (item) => (item.name))

      res.send(response)

    });
  } catch (e) {
    /* eslint-disable */
    console.error(err);
    /* eslint-enable */
    res.status(err.response.status).json({
      'message': err.response.statusText
    })
  }
})

router.get('/pages/:slug', (req, res, next) => {

  if (!req.params.slug) {
    let error = new Error()
    error.status = 404
    next(error)
    return
  }

  if (req.params.slug === 'index' || req.params.slug === 'no-match') {
    try {
      return res.send(yaml.safeLoad(fs.readFileSync('./static/' + req.params.slug + '.yml', 'utf8')))
    } catch (e) {
      reject(err)
      next(e)
    }
  }

  let lookupUrl = config.contentful.contentHost + '/spaces/%s/entries?content_type=%s&fields.slug[match]=%s'
  let pageUrl = util.format(lookupUrl, config.contentful.contentSpace, config.contentful.contentTypes.drug, req.params.slug)

  axios.get(pageUrl).then(json => {
    if (json.data.total === 0) {
      let error = new Error()
      error.status = 404
      return next(error)
    }

    let response = json.data.items[0].fields

    if (response.description) {
      response.description = marked(response.description)
    }

    res.send(response)

  }).catch(function (error) {
    // handle error
    res.status(error.response.status).json({
      'message': error.response.statusText
    })
  })

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

  res.status(status)
    .json({
      error: msg
    })
})

export default router
