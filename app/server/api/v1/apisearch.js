import { config } from 'config'
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

/**
 * Add middleware to parse json
 */

var jsonParser = bodyParser.json()

router.get('/optional/:term', jsonParser, (req, res, next) => {
  try {
    if (!req.params.term) {
      const error = new Error()
      error.status = 404
      return next(error)
    }
    const search = res.search
    const searchTerm = req.params.term.toLowerCase()

    search.elasticsearch.client.search({
      index: `contentful_mltlrs3kods6_en-us`,
      body: buildQuery('should', searchTerm)
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

router.get('/required/:term', jsonParser, (req, res, next) => {
  try {
    if (!req.params.term) {
      const error = new Error()
      error.status = 404
      return next(error)
    }
    const search = res.search
    const searchTerm = req.params.term.toLowerCase()

    search.elasticsearch.client.search({
      index: `contentful_mltlrs3kods6_en-us`,
      body: buildQuery('must', searchTerm)
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

const buildQuery = (shouldOrMustQuery, searchTerm) => {
  let query = [{
    // Exact matches
    'constant_score': {
      'filter': {
        'term': {
          'title': searchTerm
        }
      },
      'boost': 30
    }}, {
    'constant_score': {
      'filter': {
        'term': {
          'synonymsList': searchTerm
        }
      },
      'boost': 5
    }}, {
    // Fuzzy matches
    'multi_match': {
      'fields': [ 'title', 'synonymsList' ],
      'query': searchTerm,
      'fuzziness': '1'
    }}, {
    // Phrase matches
    'multi_match': {
      'query': searchTerm,
      'fields': [
        'description.localised',
        'appearance_whatDoesItTastesmellLike.localised',
        'appearance_howDoPeopleTakeIt.localised',
        'effects_howDoesItMakeYouFeel.localised',
        'effects_howDoesItMakePeopleBehave.localised',
        'effects_whatAreThePhysicalEffects.localised',
        'effects_whatIsTheComedownLike.localised',
        'effects_howLongDoesItStayInYourBody.localised',
        'risks_whatAreTheRisks.localised',
        'risks_canYouGetAddicted.localised',
        'risks_isItDangerousToMixWithOtherDrugs.localised',
        'risks_whatIsCutWith.localised',
        'effects_howDoesItEffectSocietyAndTheEnvironment.localised',
        'law_whatIsTheDrugClassification.localised',
        'law_whatIfYouAreCaughtWithIt.localised',
        'worried_iFeelPressuredIntoTakingItWhatCanIDo.localised',
        'worried_howCanIHelpMyFriendWithTheirUse.localised',
        'worried_iveSpentAllMyMoneyOnItWhatCanIDo.localised'
      ],
      'type': 'phrase'
    }
  }];

  return shouldOrMustQuery === 'must' ? {
    'query': {
      'bool': {
        'must': query
      }
    },
    'highlight': hightlightsQuery(),
    'suggest': suggestQuery(searchTerm)
  } : {
    'query': {
      'bool': {
        'should': query
      }
    },
    'highlight': hightlightsQuery(),
    'suggest': suggestQuery(searchTerm)
  }

}

const hightlightsQuery = () => ({
  'order': 'score',
  'number_of_fragments': 2,
  'pre_tags': ['<strong>'],
  'post_tags': ['</strong>'],
  'fragment_size': 150,
  'fields': {
    'title': {
      'fragment_size': 20
    },
    'title.partial': {},
    'synonymsList': {},
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
})

const suggestQuery = (searchTerm) => ({
  'text': searchTerm,
  'titlecompletion': {
    'completion': {
      'field': 'title.completion'
    }
  },
  'synonymcompletion': {
    'completion': {
      'field': 'synonymsList.completion'
    }
  },
  'title': {
    'term': {
      'field': 'title'
    }
  },
  'synonym': {
    'term': {
      'field': 'synonymsList'
    }
  }
})

export default router