import { config } from 'config'
import axios from 'axios'
/**
 * Express routes
 */
import searchRoutes from './apisearch.js'

const express = require('express')
const yaml = require('js-yaml')
const fs = require('fs')
const bodyParser = require('body-parser')
const util = require('util')
const marked = require('marked')
const router = express.Router()
const sortBy = require('lodash.sortby')
const groupBy = require('lodash.groupby')
const Sentry = require('@sentry/node')
import {
  getContentfulHost,
  getContentfulAccessToken
} from '../../../shared/utilities'

/**
 * Axios global config
 */


/**
 * Get page data
 */

router.use('/search', searchRoutes)

router.get('/pages/:slug', (req, res, next) => {
  if (!req.params.slug) {
    let error = new Error()
    error.message = 'Page id not set'
    error.status = 404
    return next(error)
  }

  if (req.params.slug === 'index' || req.params.slug === 'no-match') {
    try {
      return res.send(yaml.safeLoad(fs.readFileSync('./static/' + req.params.slug + '.yml', 'utf8')))
    } catch (e) {
      reject(err)
      next(e)
    }
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${getContentfulAccessToken(req)}`
  let lookupUrl = getContentfulHost(req) + '/spaces/%s/entries?content_type=%s&fields.slug[match]=%s'
  let pageUrl = util.format(lookupUrl, config.contentful.contentSpace, config.contentful.contentTypes.drug, req.params.slug)

  axios.get(pageUrl).then(json => {
    if (json.data.total === 0) {
      let error = new Error()
      error.message = `Page not found ${pageUrl}`
      error.status = 404
      return next(error)
    }

    let response = json.data.items[0].fields

    // Fields that need to be converted to HMTL from markdown
    const markedFields = [
      'description',
      'appearance_whatDoesItLookLike',
      'appearance_whatDoesItTastesmellLike',
      'appearance_howDoPeopleTakeIt',
      'effects_howDoesItMakeYouFeel',
      'effects_howDoesItMakePeopleBehave',
      'effects_whatAreThePhysicalEffects',
      'effects_whatIsTheComedownLike',
      'effects_howLongDoesItStayInYourBody',
      'risks_whatAreTheRisks',
      'risks_canYouGetAddicted',
      'risks_isItDangerousToMixWithOtherDrugs',
      'risks_whatIsCutWith',
      'effects_howDoesItEffectSocietyAndTheEnvironment',
      'law_whatIsTheDrugClassification',
      'law_whatIfYouAreCaughtWithIt',
      'worried_iFeelPressuredIntoTakingItWhatCanIDo',
      'worried_howCanIHelpMyFriendWithTheirUse',
      'worried_iveSpentAllMyMoneyOnItWhatCanIDo'
    ]

    Object.keys(response)
      .filter(field => markedFields.indexOf(field) !== -1)
      .map(field => {
        response[field] = marked(response[field])
      })

    res.send(response)
  })
})

/**
 * Get page data
 */
router.get('/drugList', (req, res, next) => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${getContentfulAccessToken(req)}`
    let lookupUrl = config.contentful.contentHost + '/spaces/%s/entries?content_type=%s'
    let pageUrl = util.format(lookupUrl, config.contentful.contentSpace, config.contentful.contentTypes.drug)

    axios.get(pageUrl).then(json => {
      if (json.data.total === 0) {
        let error = new Error()
        error.message = `Page not found ${pageUrl}`
        error.status = 404
        return next(error)
      }

      let response = {
        list: []
      }

      json.data.items.map((item) => {
        response.list[response.list.length] = {
          // name: item.fields.name.toLowerCase(),
          name: item.fields.name,
          slug: `/drug/${item.fields.slug}`,
          synonyms: item.fields.synonyms,
          description: item.fields.description
        }

        item.fields.synonyms.split(',').map(synonym => {
          response.list[response.list.length] = {
            name: synonym.trim(),
            slug: `/drug/${item.fields.slug}`,
            parent: item.fields.name
          }
        })
      })

      let grouped = groupBy(response.list, val => {
        return val.name.charAt(0)
      })

      let groupedArray = []
      for (var i in grouped) {
        let sortedValues = sortBy(grouped[i], (item) => {
          return item.name.toLowerCase()
        })
        groupedArray.push({
          group: i,
          values: sortedValues
        })
      }

      let numbers = []
      response.list = sortBy(groupedArray, (item) => (item.group)).filter(v => {
        if (!isNaN(parseFloat(v.group))) {
          numbers.push(v)
          return false
        }

        return isNaN(parseFloat(v.group)) && v.group !== ''
      })

      response.list = response.list.concat(numbers)

      res.send(response)
    })
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
