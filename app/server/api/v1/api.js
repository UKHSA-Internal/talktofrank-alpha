import { config } from 'config'
import axios from 'axios'

const express = require('express')
const yaml = require('js-yaml')
const fs = require('fs')
const bodyParser = require('body-parser')
const util = require('util')
const marked = require('marked')
const router = express.Router()
const sortBy = require('lodash.sortby')

axios.defaults.headers.common['Authorization'] = `Bearer ${config.contentful.contentAccessToken}`

/**
 * Add middleware to parse json
 */

var jsonParser = bodyParser.json()

/**
 * Get page data
 */

router.get('/search/term/:term', jsonParser, (req, res, next) => {
  try {
    if (!req.params.term) {
      const error = new Error()
      error.status = 404
      return next(error)
    }
    const search = res.search
    const searchTerm = req.params.term.toLowerCase()
    const generatedQuery = {
      'query': {
        'bool': {
          'should': [{
            'constant_score': {
              'filter': {
                'term': {
                  'title': searchTerm
                }
              },
              'boost': 30
            }
          }, {
            'constant_score': {
              'filter': {
                'term': {
                  'synonym.comma_separated': searchTerm
                }
              },
              'boost': 5
            }
          }, {
            'multi_match': {
              'fields': [ 'title', 'synonyms.comma_separated' ],
              'query': searchTerm,
              'fuzziness': '1'
            }
          }, {
            'multi_match': {
              'query': searchTerm,
              'fields': ['description.localised', 'appearance_whatDoesItTastesmellLike.localised', 'appearance_howDoPeopleTakeIt.localised', 'effects_howDoesItMakeYouFeel.localised', 'effects_howDoesItMakePeopleBehave.localised', 'effects_whatAreThePhysicalEffects.localised', 'effects_whatIsTheComedownLike.localised', 'effects_howLongDoesItStayInYourBody.localised', 'risks_whatAreTheRisks.localised', 'risks_canYouGetAddicted.localised', 'risks_isItDangerousToMixWithOtherDrugs.localised', 'risks_whatIsCutWith.localised', 'effects_howDoesItEffectSocietyAndTheEnvironment.localised', 'law_whatIsTheDrugClassification.localised', 'law_whatIfYouAreCaughtWithIt.localised', 'worried_iFeelPressuredIntoTakingItWhatCanIDo.localised', 'worried_howCanIHelpMyFriendWithTheirUse.localised', 'worried_iveSpentAllMyMoneyOnItWhatCanIDo.localised'],
              'type': 'phrase'
            }
          }]
        }
      },
      'highlight': {
        'order': 'score',
        'number_of_fragments': 2,
        'pre_tags': ['<strong>'],
        'post_tags': ['</strong>'],
        'fragment_size': 150,
        'fields': {
          'title': {
            'fragment_size': 20
          },
          'synonyms.comma_separated': {
            'fragment_size': 1,
            'pre_tags': [''],
            'post_tags': ['']
          },
          'title.localised': {},
          'synonyms.partial': {},
          'title.partial': {},
          'description.localised': {},
          'appearance_whatDoesItTastesmellLike.localised': {},
          'appearance_howDoPeopleTakeIt.localised': {},
          'effects_howDoesItMakeYouFeel.localised': {},
          'effects_howDoesItMakePeopleBehave.localised': {},
          'effects_whatAreThePhysicalEffects.localised': {},
          'effects_whatIsTheComedownLike.localised': {},
          'effects_howLongDoesItStayInYourBody.localised': {},
          'risks_whatAreTheRisks.localised': {},
          'risks_canYouGetAddicted.localised': {},
          'risks_isItDangerousToMixWithOtherDrugs.localised': {},
          'risks_whatIsCutWith.localised': {},
          'effects_howDoesItEffectSocietyAndTheEnvironment.localised': {},
          'law_whatIsTheDrugClassification.localised': {},
          'law_whatIfYouAreCaughtWithIt.localised': {},
          'worried_iFeelPressuredIntoTakingItWhatCanIDo.localised': {},
          'worried_howCanIHelpMyFriendWithTheirUse.localised': {},
          'worried_iveSpentAllMyMoneyOnItWhatCanIDo.localised': {}
        }
      },
      'suggest': {
        'text': searchTerm,
        'titlec': {
          'completion': {
            'field': 'title.completion'
          }
        },
        'synonymc': {
          'completion': {
            'field': 'synonyms.completion'
          }
        },
        'title': {
          'term': {
            'field': 'title'
          }
        },
        'synonym': {
          'term': {
            'field': 'synonyms'
          }
        }
      }
    }
    search.elasticsearch.client.search({
      index: `contentful_mltlrs3kods6_en-us`,
      body: generatedQuery
    }).then(results => (
      res.status(200).json({
        'results': results.hits.hits,
        'suggest': results.suggest
      })
    )).catch(err => {
      /* eslint-disable */
      console.error(err);
      /* eslint-enable */
      res.status(500).json({
        'message': 'Internal error'
      })
    })
  } catch (err) {
    /* eslint-disable */
    console.error(err);
    /* eslint-enable */
    res.status(500).json({
      'message': 'Internal error'
    })
  }
})

router.get('/drugList', (req, res, next) => {
  try {
    const lookupUrl = config.contentful.contentHost +
       '/spaces/%s/entries?content_type=%s'

    const pageUrl = util.format(
      lookupUrl,
      config.contentful.contentSpace,
      config.contentful.contentTypes.drug
    )
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
    })
  } catch (err) {
    /* eslint-disable */
    console.error(err);
    /* eslint-enable */
    res.status(err.response.status).json({
      'message': err.response.statusText
    })
  }
})

// router.use(bodyParser.json())

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

    if (response.appearance_whatDoesItLookLike) {
      response.appearance_whatDoesItLookLike = marked(response.appearance_whatDoesItLookLike)
    }

    if (response.appearance_whatDoesItTastesmellLike) {
      response.appearance_whatDoesItTastesmellLike = marked(response.appearance_whatDoesItTastesmellLike)
    }

    if (response.appearance_howDoPeopleTakeIt) {
      response.appearance_howDoPeopleTakeIt = marked(response.appearance_howDoPeopleTakeIt)
    }

    if (response.effects_howDoesItMakeYouFeel) {
      response.effects_howDoesItMakeYouFeel = marked(response.effects_howDoesItMakeYouFeel)
    }

    if (response.effects_howDoesItMakePeopleBehave) {
      response.effects_howDoesItMakePeopleBehave = marked(response.effects_howDoesItMakePeopleBehave)
    }

    if (response.effects_whatAreThePhysicalEffects) {
      response.effects_whatAreThePhysicalEffects = marked(response.effects_whatAreThePhysicalEffects)
    }

    if (response.effects_whatIsTheComedownLike) {
      response.effects_whatIsTheComedownLike = marked(response.effects_whatIsTheComedownLike)
    }

    if (response.effects_howLongDoesItStayInYourBody) {
      response.effects_howLongDoesItStayInYourBody = marked(response.effects_howLongDoesItStayInYourBody)
    }

    if (response.risks_whatAreTheRisks) {
      response.risks_whatAreTheRisks = marked(response.risks_whatAreTheRisks)
    }

    if (response.risks_canYouGetAddicted) {
      response.risks_canYouGetAddicted = marked(response.risks_canYouGetAddicted)
    }

    if (response.risks_isItDangerousToMixWithOtherDrugs) {
      response.risks_isItDangerousToMixWithOtherDrugs = marked(response.risks_isItDangerousToMixWithOtherDrugs)
    }

    if (response.risks_whatIsCutWith) {
      response.risks_whatIsCutWith = marked(response.risks_whatIsCutWith)
    }

    if (response.effects_howDoesItEffectSocietyAndTheEnvironment) {
      response.effects_howDoesItEffectSocietyAndTheEnvironment = marked(response.effects_howDoesItEffectSocietyAndTheEnvironment)
    }

    if (response.law_whatIsTheDrugClassification) {
      response.law_whatIsTheDrugClassification = marked(response.law_whatIsTheDrugClassification)
    }

    if (response.law_whatIfYouAreCaughtWithIt) {
      response.law_whatIfYouAreCaughtWithIt = marked(response.law_whatIfYouAreCaughtWithIt)
    }

    if (response.worried_iFeelPressuredIntoTakingItWhatCanIDo) {
      response.worried_iFeelPressuredIntoTakingItWhatCanIDo = marked(response.worried_iFeelPressuredIntoTakingItWhatCanIDo)
    }

    if (response.worried_howCanIHelpMyFriendWithTheirUse) {
      response.worried_howCanIHelpMyFriendWithTheirUse = marked(response.worried_howCanIHelpMyFriendWithTheirUse)
    }

    if (response.worried_iveSpentAllMyMoneyOnItWhatCanIDo) {
      response.worried_iveSpentAllMyMoneyOnItWhatCanIDo = marked(response.worried_iveSpentAllMyMoneyOnItWhatCanIDo)
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

      // let numbers = []
      response.list = sortBy(response.list, (item) => (item.name)).filter(v => {
        // if (!isNaN(parseFloat(v.name))) {
        //   numbers.push(v)
        //   return
        // }
        return isNaN(parseFloat(v.name)) && v.name !== ''
      })

      // @joel - commenting this out as the filtering / mapping at the component
      // level messes the order up again and ignores that the numers come last : /
      // response.list = response.list.concat(numbers)
      res.send(response)
    })
  } catch (e) {
    /* eslint-disable */
    console.error(err);
    /* eslint-enable */
    res.status(err.response.status).json({
      'message': err.response.statusText
    })
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

  res.status(status)
    .json({
      error: msg
    })
})

export default router
