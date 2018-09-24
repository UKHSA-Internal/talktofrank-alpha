import { config } from 'config'
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

/**
 * Add middleware to parse json
 */

var jsonParser = bodyParser.json()

router.get('/page/:term', jsonParser, (req, res, next) => {
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
      body: buildFullMatchQuery(searchTerm)
    }).then(results => res.status(200).json(formatResults(results, searchTerm, true)))
  } catch (err) {
    /* eslint-disable */
    console.error(err)
    /* eslint-enable */
    let error = new Error()
    error.status = 500
    return next(error)
  }
})

router.get('/autocomplete/:term', jsonParser, (req, res, next) => {
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
      body: buildPrefixQuery(searchTerm)
    }).then(results => res.status(200).json(formatAutocompleteResults(results, searchTerm, true)))
  } catch (err) {
    /* eslint-disable */
    console.error(err)
    /* eslint-enable */
    let error = new Error()
    error.status = 500
    return next(error)
  }
})

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
  } catch (err) {
    /* eslint-disable */
    console.error(err)
    /* eslint-enable */
    let error = new Error()
    error.status = 500
    return next(error)
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
  } catch (err) {
    /* eslint-disable */
    console.error(err)
    /* eslint-enable */
    let error = new Error()
    error.status = 500
    return next(error)
  }
})

const isQueryAQuestion = (searchTerm) => {
  return Boolean(searchTerm.match(/(what|why|when|how|who)/ig)) || searchTerm.match(/\S+/g).length > 2
}

const formatAutocompleteResults = (results, drugSearchTerm, sort) => {
  const hits = results.hits.hits

  let formattedResults = formatResultHits(hits)

  // Show suggestions
  if (!formattedResults.length && results.suggest) {
    Object.keys(results.suggest).map(suggestionGroup => {
      results.suggest[suggestionGroup].map(suggestionGroupResults => {
        formattedResults = formattedResults.concat(formatResultHits(suggestionGroupResults.options))
      })
    })
  }

  // @todo: refactor - would need to add new ES mapping for alpabetical sorting, move there
  if (sort) formattedResults.sort((a, b) => a.name > b.name)

  let serverResponse = {
    'results': formattedResults,
    'searchTerm': drugSearchTerm,
    'match': matchInHits(hits, drugSearchTerm),
    'isQueryAQuestion': isQueryAQuestion(drugSearchTerm)
  }

  if (config.elasticsearch.showESResult) {
    serverResponse = Object.assign({}, serverResponse, {'esResults': results})
  }

  return serverResponse
}

const matchInHits = (hits, searchTerm) => {
  let match = false
  hits.map(result => {
    // check if any of the hits is in the search term
    if (searchTerm.toLowerCase().indexOf(result._source.title.toLowerCase()) !== -1) {
      match = true
    }
  })
  return match
}

const formatResults = (results, searchTerm) => {
  let formattedSuggestions = []
  let formattedResults = []
  let formattedPhraseMatches = []
  let likelyMisspellings = []
  let match = false
  const hits = results.hits.hits

  if (results.suggest) {
    Object.keys(results.suggest).map(suggestionGroup => {
      results.suggest[suggestionGroup].map(suggestionGroupResults => {
        // Return a list of words in the search that have been potentially
        // misspelled
        const suggestionInputTerm = suggestionGroupResults.text.toLowerCase()
        if (suggestionGroupResults.options.length &&
          likelyMisspellings.indexOf(suggestionInputTerm) === -1 &&
          suggestionInputTerm !== 'what' &&
          suggestionInputTerm !== 'how' &&
          suggestionInputTerm !== 'when') {
          likelyMisspellings[likelyMisspellings.length] = suggestionInputTerm
        }

        suggestionGroupResults.options
          .filter(suggestionGroupResultsItem => {
            if (searchTerm.indexOf(suggestionGroupResultsItem.text.toLowerCase()) !== -1) {
  //             match = suggestionGroupResultsItem.text.toLowerCase()
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
              if (item.text === suggestionItem &&
                item.score < suggestionItemScore) {
                formattedSuggestions.splice(index, 1)
              } else if (item.text === suggestionItem) {
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

  //         if (formattedSuggestions.length >= config.elasticsearch.suggestResultCount) return
      })
    })
  }
  // Fetch title & synonym matches
  formattedResults = formatResultHits(hits)

  // Fetch phrase matches
  hits.map(result => {
    if (result.highlight) {
      Object.keys(result.highlight).map(fieldName => {
        if (fieldName === 'title' ||
          fieldName === 'description' ||
          fieldName === 'synonymsList' ||
          fieldName === 'synonymsList.completion') {
          return null
        }
        formattedPhraseMatches.push({
          'text': result.highlight[fieldName][0],
          'drugName': result._source.title,
          'link': result._source.slug,
          'score': result._score,
          'topic': fieldName.split('_')[0]
        })
      })
    }

    // check if any of the hits is in the search term
    if (searchTerm.toLowerCase().indexOf(result._source.title.toLowerCase()) !== -1) {
      match = true
    }
  })
  let serverResponse = {
    'results': formattedResults,
    'phraseMatches': formattedPhraseMatches,
    'suggestions': formattedSuggestions,
    'match': match,
    'searchTerm': searchTerm,
    'likelyMisspellings': likelyMisspellings,
    'isQueryAQuestion': isQueryAQuestion(searchTerm)
  }

  if (config.elasticsearch.showESResult) {
    serverResponse = Object.assign({}, serverResponse, {'esResults': results})
  }

  return serverResponse
}

const formatResultHits = (hits) => {
  let formattedResults = []

  hits.map(result => {
    const description = result.highlight && result.highlight.description
      ? result.highlight.description
      : result._source ? result._source.description : ''

    if (result.highlight && result.highlight['synonymsList.completion']) {
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
    } else if (result.highlight && result.highlight['synonymsList.partial']) {
      result.highlight['synonymsList.partial'].map(synonymsListItem => {
        addFormattedResult(
          synonymsListItem,
          result._source.title,
          result._source.slug,
          description,
          result._score,
          formattedResults
        )
      })
    } else if (result.highlight && result.highlight.synonymsList) {
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
    } else {
      if (!result._source) return
      addFormattedResult(
        result.text ? result.text : result._source.title,
        result._source.title,
        result._source.slug,
        description,
        result._score,
        formattedResults
      )
    }
  })

  return formattedResults
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

/**
 * Search page
 * @param searchTerm
 * @returns {{query: {multi_match: {query: *, type: string, fields: string[]}}, highlight: {order: string, number_of_fragments: number, pre_tags: string[], post_tags: string[], fragment_size: number, fields: {title: {fragment_size: number}, "synonymsList.completion": {pre_tags: string[], post_tags: string[]}}}}}
 */
const buildFullMatchQuery = (searchTerm) => {
  return {
    'query': {
      'multi_match': {
        'query': searchTerm,
        'type': 'best_fields',
        'fuzziness': 'auto',
        'prefix_length': 1,
        'fields': ['title.*', 'synonymsList.*']
      }
    },
    'highlight': {
      'order': 'score',
      'number_of_fragments': 2,
      'pre_tags': [''],
      'post_tags': [''],
      'fragment_size': 150,
      'fields': {
        'title.*': {},
        'synonymsList.*': {}
      }
    }
  }
}

/**
 * Used for automcomplete
 * @param searchTerm
 * @returns {{query: {multi_match: {query: *, type: string, fields: string[]}}, highlight: {order: string, number_of_fragments: number, pre_tags: string[], post_tags: string[], fragment_size: number, fields: {title: {fragment_size: number}, "synonymsList.completion": {pre_tags: string[], post_tags: string[]}}}}}
 */
const buildPrefixQuery = (searchTerm) => {
  return {
    'query': {
      'multi_match': {
        'query': searchTerm,
        'type': 'phrase_prefix',
        'fields': ['title.completion', 'synonymsList.completion']
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
        'synonymsList.completion': {
          'pre_tags': ['<span class="match">'],
          'post_tags': ['</span>']
        }
      }
    }
  }
}

/**
 * No longer used - splits out search results in separate 'matches' & 'suggestions'
 * @param searchTerm
 * @returns {{query: {multi_match: {query: *, type: string, fields: string[]}}, highlight: {order: string, number_of_fragments: number, pre_tags: string[], post_tags: string[], fragment_size: number, fields: {title: {fragment_size: number}, "synonymsList.completion": {pre_tags: string[], post_tags: string[]}}}}}
 */
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
        'boost': 15
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
        }]

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

/**
 * No longer used - uses a known drug name to find definite results
 * splits out search results in separate 'matches' & 'suggestions'
 *
 * @param searchTerm
 * @returns {{query: {multi_match: {query: *, type: string, fields: string[]}}, highlight: {order: string, number_of_fragments: number, pre_tags: string[], post_tags: string[], fragment_size: number, fields: {title: {fragment_size: number}, "synonymsList.completion": {pre_tags: string[], post_tags: string[]}}}}}
 */
const buildMustQuery = (drugSearchTerm, phraseSearchTerm) => {
  const mustQuery = [{
    // Phrase matches
    'bool': {
      'minimum_should_match': 1,
      'should': [{
        'match': {
          'title': {
            'query': drugSearchTerm
          }
        }}, {
          'match': {
            'synonymsList.completion': {
              'query': drugSearchTerm
            }
          }}
      ]
    }
  }]

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
  }]

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
    'synonymsList.completion': {
      'pre_tags': [''],
      'post_tags': ['']
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
