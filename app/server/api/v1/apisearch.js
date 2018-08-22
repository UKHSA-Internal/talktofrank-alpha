import { config } from 'config'
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

/**
 * Add middleware to parse json
 */

var jsonParser = bodyParser.json()

router.get('/should/:term', jsonParser, (req, res, next) => {
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
      body: buildShouldQuery(searchTerm)
    }).then(results => res.status(200).json(formatResults(results, searchTerm)))
      .catch(err => {
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

router.get('/must/:term', jsonParser, (req, res, next) => {
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
      body: buildMustQuery(searchTerm)
    }).then(results => res.status(200).json(formatResults(results, searchTerm)))
      .catch(err => {
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

const formatResults = (results, searchTerm) => {

  let formattedSuggestions = []
  let formattedResults = []
  let formattedPhraseMatches = []
  let match = false
  const hits = results.hits.hits

  Object.keys(results.suggest).map(suggestionGroup => {
    results.suggest[suggestionGroup].map(suggestionGroupResults => {
      suggestionGroupResults.options
        .filter(suggestionGroupResultsItem => {
          if (suggestionGroupResultsItem.text.toLowerCase() === searchTerm) {
            match = true
            return false
          } else {
            return true
          }
        })
        .map(suggestionGroupResultsItem => {
          let skip = false
          const suggestionItem = suggestionGroupResultsItem.text.toLowerCase()
          const suggestionItemScore = suggestionGroupResultsItem.score
            ? suggestionGroupResultsItem.score
            : suggestionGroupResultsItem._score

          // Check if the suggestion is already added & if score is higher
          // remove existing and add new
          formattedSuggestions.map((item, index) => {
            if (item.text === suggestionItem
              && item.score < suggestionItemScore) {
              formattedSuggestions.splice(index, 1)
            } else {
              skip = true
            }
          })

          if (skip) return

          formattedSuggestions.push({
            text: suggestionItem,
            score: suggestionItemScore
          })
        })

        if (formattedSuggestions.length >= config.elasticsearch.suggestResultCount) return
      })
  })

  hits.map(result => {

    const description = result.highlight.description
    && result.highlight.description.localised
      ? result.highlight.description.localised
      : result._source.description

    if (formattedResults.length < config.elasticsearch.drugResultCount) {
      if (result.highlight.synonymsList) {
        result.highlight.synonymsList.map(synonymsListItem => {
          addFormattedResult(
            synonymsListItem,
            result._source.title,
            result._source.slug,
            description,
            result._score,
            formattedResults
          )
        })
      }
      else {
        addFormattedResult(
          result._source.title,
          result._source.title,
          result._source.slug,
          description,
          result._score,
          formattedResults
        )
      }
    }

    if (result.highlight) {
      Object.keys(result.highlight).map(fieldName => {
        if (fieldName === 'title'
          || fieldName === 'description.localised'
          || fieldName === 'synonymsList'
          || formattedPhraseMatches.length >= config.elasticsearch.phraseResultCount) {
          return null
        }
        formattedPhraseMatches.push({
          'text': result.highlight[fieldName][0],
          'drugName': result._source.title,
          'link': result._source.slug,
          'score': result._score,
          'topic': fieldName.split('_')[0]
        });
      })
    }
  })

  return {
    'results': formattedResults,
    'phraseMatches': formattedPhraseMatches,
    'suggestions': formattedSuggestions,
    'es_results': results,
    'match': match

  }
}


const addFormattedResult = (name, drug, slug, description, score, arr) => {
  return arr.push({
    'name': name,
    'drug': drug,
    'link': slug,
    'description': description,
    'score': score
  })
}

const buildShouldQuery = (searchTerm) => {
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
      'fields': [ 'title^2', 'synonymsList^2' ],
      'query': searchTerm,
      'fuzziness': 'auto'
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

  return {
    'query': {
      'bool': {
        'should': query
      }
    },
    'highlight': hightlightsQuery(),
    'suggest': suggestQuery(searchTerm)
  }
}

const buildMustQuery = (searchTerm) => {

  const mustQuery = [{
    // Phrase matches
    'match': {
      'title': searchTerm
    }
  }];

  const shouldQuery = [{
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

  return {
    'query': {
      'bool': {
        'must': mustQuery,
        'should': shouldQuery
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
    'synonymsList': {
      'pre_tags': [''],
      'post_tags': ['']
    },
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
  },
  'synonymPhrase': {
    'phrase': {
      'field': 'synonymsList'
    }
  },
  'synonymPartial': {
    'phrase': {
      'field': 'synonymsList.partial'
    }
  }
})

export default router