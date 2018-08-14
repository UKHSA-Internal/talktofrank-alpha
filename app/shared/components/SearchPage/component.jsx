import React from 'react'
import { Link } from 'react-router'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
const util = require('util')

export default class SearchPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
    this.addToSuggestionsIfNotSearchTerm = this.addToSuggestionsIfNotSearchTerm.bind(this)
    this.state = {
      searchValue: ''
    }
  }

  getTitleResult (item) {
    let value = ''
    if (!item.highlight) return null

    if (item.highlight.title) {
      value = item.highlight.title
    } else if (item.highlight['title.partial']) {
      value = item.highlight['title.partial']
    } else {
      value = item._source.title
    }
    return (<p className="h3" dangerouslySetInnerHTML={{__html: value}} />)
  }

  getSynonymResult (item) {
    let value = ''
    if (!item.highlight) return null
    if (item.highlight.synonyms) {
      value = item.highlight.synonyms
    } else if (item.highlight['synonyms.partial']) {
      value = item.highlight['synonyms.partial']
    } else {
      value = item._source.synonyms
    }
    return (<p className="lead muted" dangerouslySetInnerHTML={{__html: value}} />)
  }

  getHighlights (item) {
    if (!item.highlight) return null
    const { title, ...otherHighlights } = item.highlight
    const synonyms = otherHighlights['synonyms.comma_separated']

    return (
      <React.Fragment>
        { title &&
          <li className="search__list-item">
            <p className="h3">{item._source.title}</p>
            <Link to={`/drug/${item._source.slug}`}>read more...</Link>
          </li>
        }
        { synonyms &&
          <li className="search__list-item">
            <p className="h3">{this.getFullSynonym(item, synonyms)}</p>
            <Link to={`/drug/${item._source.slug}`}>read more...</Link>
          </li>
        }
        {
          Object.keys(otherHighlights).map(highlightName => {
            if (highlightName === 'synonyms.comma_separated') return null
            return (
              <li className="search__list-item">
                { this.resultItemText(item, otherHighlights[highlightName], highlightName) }
              </li>
            )
          })
        }
      </React.Fragment>
    )
  }

  getHeading (field, drugName) {
    const headings = {
      'risks': 'the risks of using %s',
      'effects': 'the effects of using %s?',
      'appearance': 'what %s looks like',
      'law': 'what the law says about %s',
      'worried': 'the worries of using %s?',
      'description.localised': '%s'
    }
    return util.format(headings[field], drugName)
  }

  // this is a dirty work around for Alpha
  // @TODO replace with ES field of array items
  getFullSynonym (item, matchedValue) {
    const synonyms = item._source.synonyms
    const startString = item._source.synonyms.indexOf(matchedValue[0])
    const splitString = synonyms.split(matchedValue[0])[0]
    const startStringSynonym = splitString.lastIndexOf(',') !== -1
      ? splitString.lastIndexOf(',') + 1
      : startString
    const endString = item._source.synonyms.indexOf(',', startString) !== -1
      ? item._source.synonyms.indexOf(',', startString)
      : item._source.synonyms.length
    const fullSynonym = synonyms.substring(startStringSynonym, endString)
    return util.format('%s (%s)', fullSynonym.trim(), item._source.title)
  }

  resultItem (item, name, showDrug = false) {
    return (
      <React.Fragment>
        {showDrug &&
          <p className="h3">{item._source.title}</p>
        }
        <Link to={`/drug/${item._source.slug}`}>
          <span dangerouslySetInnerHTML={{__html: name}}/>
        </Link>
      </React.Fragment>
    )
  }

  resultItemText (item, matchingText, fieldName) {
    return (
      <React.Fragment>
        <p dangerouslySetInnerHTML={{__html: matchingText}}/>
        <p>more about{' '}
          <Link to={`/drug/${item._source.slug}`}>
            {this.getHeading(fieldName.split('_')[0], item._source.title)}
            </Link>
        </p>
      </React.Fragment>
    )
  }

  getDidYouMean (suggestions) {
    if (!suggestions) return null
    let displayValues = []
    Object.keys(suggestions).map(item => {
      suggestions[item][0].options
        .filter(this.addToSuggestionsIfNotSearchTerm)
        .map(match => displayValues.push(match))
    })

    if (!displayValues.length) return null

    return (
      <React.Fragment>
        <p>
          <span className="h4">Did you mean:</span>{' '}
          { displayValues.map((item, key) =>
            <React.Fragment>
              <a onClick={this.handleSuggestionClick}>
                {item._source ? item._source.title : item.text}
              </a>
              { key + 1 < displayValues.length && ', '}
            </React.Fragment>
          )}
        </p>
      </React.Fragment>
    )
  }

  getResults (results) {
    if (!results || !results.length) return null
    return (
      <React.Fragment>
        <h2>Results</h2>
        <ul className="search__list">
          { results.map(item => (
              this.getHighlights(item)
          ))}
        </ul>
      </React.Fragment>
    )
  }

  handleSuggestionClick (e) {
    e.preventDefault()
    const value = e.target.innerHTML
    this.setState({
      searchValue: value
    }, () => {
      this.props.searchForTerm(value)
    })
  }

  addToSuggestionsIfNotSearchTerm (item) {
    return item.text.toLowerCase() !== this.state.searchValue.toLowerCase()
  }

  handleInputChange (e) {
    e.preventDefault()
    this.setState({
      searchValue: e.target.value
    })
    if (e.target.value.length < 2) return null
    this.props.searchForTerm(e.target.value)
  }

  render () {
    const { loading, results, suggest } = this.props
    const { searchValue } = this.state
    return (
      <React.Fragment>
        <Masthead/>
        <div className='main-wrapper'>
          <h1>Search</h1>
          <Grid>
            <GridCol className='col-8 col-md-8 col-sm-12 search'>
              <input
                type="text"
                value={searchValue}
                onChange={this.handleInputChange}
                placeholder="Search for drugs, advice & information...."
                style={{width: '100%'}}
                className="search__input"
              />
              { loading &&
                <p>Searching...</p>
              }
              <Grid>
                <GridCol className='col-12 col-sm-12 search--suggestions'>
                  { this.getDidYouMean(suggest)}
                </GridCol>
                <GridCol className='col-12 col-sm-12'>
                  { this.getResults(results)}
                </GridCol>
              </Grid>
            </GridCol>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}
