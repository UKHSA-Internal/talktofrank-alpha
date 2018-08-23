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

router.get('/must/:phrase/:drug', jsonParser, (req, res, next) => {
  try {
    if (!req.params.phrase || !req.params.drug) {
      const error = new Error()
      error.status = 404
      return next(error)
    }
    const search = res.search
    const drugSearchTerm = req.params.drug.toLowerCase()
    const phraseSearchTerm = req.params.phrase.toLowerCase()
    search.elasticsearch.client.search({
      index: `contentful_mltlrs3kods6_en-us`,
      body: buildMustQuery(drugSearchTerm, phraseSearchTerm)
    }).then(results => res.status(200).json(formatResults(results, drugSearchTerm)))
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
          if (searchTerm.indexOf(suggestionGroupResultsItem.text.toLowerCase()) !== -1) {
            match = suggestionGroupResultsItem.text.toLowerCase()
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
            } else if(item.text === suggestionItem) {
              skip = true
            }
          })

          if (skip) {
            return
          }

          formattedSuggestions.push({
            text: suggestionItem,
            score: suggestionItemScore
          })
        })

        if (formattedSuggestions.length >= config.elasticsearch.suggestResultCount) return
      })
  })

  hits.map(result => {

    const description = result.highlight
    && result.highlight.description
      ? result.highlight.description
      : result._source.description

    if (formattedResults.length < config.elasticsearch.drugResultCount) {
      if (result.highlight
        && result.highlight['synonymsList.completion']) {
        result.highlight['synonymsList.completion'].map(synonymsListItem => {
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
      else if (result.highlight && result.highlight.synonymsList) {
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
          || fieldName === 'description'
          || fieldName === 'synonymsList'
          || fieldName === 'synonymsList.completion'
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
    }}, {
    // Fuzzy matches
    'multi_match': {
      'fields': [ 'title^2', 'synonymsList' ],
      'query': searchTerm,
      'fuzziness': 'auto'
    }}, {
    // Phrase matches
    'multi_match': {
      'query': searchTerm,
      'fields': [
        'description',
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
      ],
      'type': 'phrase',
      'analyzer': 'question_analyzer',
      'slop': 100
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

const buildMustQuery = (drugSearchTerm, phraseSearchTerm) => {

  const mustQuery = [{
    // Phrase matches
    'bool': {
      'minimum_should_match': 1,
      'should': [{
        'match' : {
          'title': {
            'query': drugSearchTerm
          }
        }}, {
        'match' : {
          'synonymsList.completion': {
            'query': drugSearchTerm
          }
        }}
      ]
    }
  }];

  const shouldQuery = [{
    // Phrase matches
    'multi_match': {
      'query': phraseSearchTerm,
      'fields': [
        'description',
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
      ],
      'type': 'phrase',
      'analyzer': 'question_analyzer',
      'slop': 100
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
    'suggest': suggestQuery(drugSearchTerm)
  }
}

const hightlightsQuery = () => ({
  'order': 'score',
  'number_of_fragments': 2,
  'pre_tags': ['<strong>'],
  'post_tags': ['</strong>'],
  'fragment_size': 250,
  'fields': {
    'title': {
      'fragment_size': 20
    },
    'title.partial': {},
    'synonymsList': {
      'pre_tags': [''],
      'post_tags': ['']
    },
    "synonymsList.completion": {
      "pre_tags": [""],
      "post_tags": [""]
    },
    'description': {},
    'appearance_whatDoesItTastesmellLike': {},
    'appearance_howDoPeopleTakeIt': {},
    'effects_howDoesItMakeYouFeel': {},
    'effects_howDoesItMakePeopleBehave': {},
    'effects_whatAreThePhysicalEffects': {},
    'effects_whatIsTheComedownLike': {},
    'effects_howLongDoesItStayInYourBody': {},
    'risks_whatAreTheRisks': {},
    'risks_canYouGetAddicted': {},
    'risks_isItDangerousToMixWithOtherDrugs': {},
    'risks_whatIsCutWith': {},
    'effects_howDoesItEffectSocietyAndTheEnvironment': {},
    'law_whatIsTheDrugClassification': {},
    'law_whatIfYouAreCaughtWithIt': {},
    'worried_iFeelPressuredIntoTakingItWhatCanIDo': {},
    'worried_howCanIHelpMyFriendWithTheirUse': {},
    'worried_iveSpentAllMyMoneyOnItWhatCanIDo': {}
  }
})

const suggestQuery = (searchTerm) => ({
  'text': searchTerm,
  'titlecompletion': {
    'completion': {
      'field': 'title.completion'
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
  'synonymcompletion': {
    'completion': {
      'field': 'synonymsList.completion'
    }
  }
})

export default router