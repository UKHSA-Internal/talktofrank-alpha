import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Footer from '../Footer/component.jsx'
import Button from '../Button/component.jsx'
import Svg from '../Svg/component.jsx'
const util = require('util')

export default class SearchPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
    this.handleMisspellingClick = this.handleMisspellingClick.bind(this)
    this.state = {
      searchValue: this.props.pageData.searchTerm,
      likelyDrugName: false,
      showSuggestions: false
    }
  }

  getDidYouMean (suggestions) {
    if (!suggestions || !suggestions.length) return null

    return (
      <React.Fragment>
        <p>
          <span className='h4'>Did you mean:</span>{' '}
          { suggestions.map((item, key) =>
            <React.Fragment key={`suggestion-${item.text}`}>
              <a className='fake-link' onClick={this.handleSuggestionClick}>
                {item.text}
              </a>
              { key + 1 < suggestions.length && ', '}
            </React.Fragment>
          )}
        </p>
      </React.Fragment>
    )
  }

  getResults (results, match = false) {
    if (!results || !results.length) return null

    if (match) {
      return (
        <ul className="search__list list-unstyled">
          {this.getResultItem(results[0], match)}
        </ul>
      )
    }

    return (
      <ul className="search__list list-unstyled">
        { results.map(item => (
          this.getResultItem(item, match)
        ))}
      </ul>
    )
  }

  getResultItem (item) {
    const {name, drug, description, link} = item
    return (
      <li key={`resultitem-${drug}-${name}`} className='list-item list-item--dotted'>
        <h3 className="h4 mt-1 mb-3">
          <a href={`/drug/${link}`}>{name}</a>
        </h3>
        { name !== drug && <p className='font-italic mt-1'>Real name: {drug}</p>}
        <p className="muted mt-1" dangerouslySetInnerHTML={{__html: description}}/>
      </li>
    )
  }

  getResultItemLink (link, name, drug, match) {
    const singleWordSearch = this.state.searchValue.toLowerCase().indexOf(' ') === -1
    if (((this.state.searchValue.toLowerCase().indexOf(name.toLowerCase()) !== -1 &&
      this.state.searchValue.toLowerCase() !== name.toLowerCase) ||
      singleWordSearch) && !match) {
      return (
        <a href="#" onClick={(e) => { this.handleMisspellingClick(e, name, drug, singleWordSearch) }}>{name}</a>
      )
    } else {
      return (
        <a href={`/drug/${link}`}>{name}</a>
      )
    }
  }

  handleMisspellingClick (e, name, drug, singleWordSearch) {
    e.preventDefault()
    let searchValue = drug
    if (!singleWordSearch) {
      searchValue = this.state.searchValue.toLowerCase().replace(name.toLowerCase(), drug.toLowerCase())
    }
    this.setState({
      searchValue: searchValue,
      likelyDrugName: drug,
      showSuggestions: false
    }, () => {
      this.props.searchForTerm(searchValue, drug, 'must')
    })
  }

  handleSubmit () {
    if (this.state.searchValue !== '') {
      const searchValue = this.state.searchValue
      window.location = `/drug/search/${searchValue}`
    }
  }

  handleSuggestionClick (e) {
    e.preventDefault()
    const value = e.target.innerHTML
    this.setState({
      searchValue: value,
      likelyDrugName: value,
      showSuggestions: false
    }, () => {
      this.props.searchForTerm(value, value, 'must')
    })
  }

  highlightMisspelling (searchValue) {
    const { likelyMisspellings } = this.props.pageData
    const regexp = new RegExp('(' + likelyMisspellings.join('|') + ')', 'ig')
    return searchValue.replace(regexp, '<span class="search__spelling">$&</span>')
  }

  handleInputChange (e) {
    e.preventDefault()
    let { likelyDrugName, showSuggestions } = this.state
    let { likelyMisspellings } = this.props.pageData
    const nextSearchValue = e.target.value.toLowerCase()
    let queryType = 'should'
    const searchTermArray = nextSearchValue.split(/[ ,]+/)
    let searchTermInSuggestions = []
    if (likelyMisspellings) {
      searchTermInSuggestions = searchTermArray.filter(n => {
        return likelyMisspellings.indexOf(n) > -1
      })
    }

    // Drug name is still in search
    if (searchTermInSuggestions.length) {
      queryType = 'must'
      likelyDrugName = nextSearchValue
    } else {
      likelyDrugName = ''
      showSuggestions = true
    }

    this.setState({
      searchValue: nextSearchValue,
      likelyDrugName,
      showSuggestions
    }, () => {
      if (nextSearchValue.length >= 2) {
        this.props.searchForTerm(nextSearchValue, likelyDrugName, queryType)
      }
    })
  }

  render () {
    const { loading } = this.props
    const { results, match, isQueryAQuestion } = this.props.pageData
    const searchValue = this.state.searchValue ? this.state.searchValue : ''
    const hasResults = Boolean(results && results.length)
    const showResults = hasResults && !isQueryAQuestion
    return (
      <React.Fragment>
        <Masthead/>
        <main className='search' id='main' name='main'>
          <div className='search--header'>
            <div>
              <h1>You've entered '<span className={!match ? 'underlined underlined--heavy' : ''}>{searchValue}</span>'</h1>
            </div>
          </div>
          <div className='main-wrapper'>
            <Grid>
              <GridCol className='col-12 col-md-8'>
                <div className='input-group' role='search'>
                  <label htmlFor='search-site' className='form-label h3 sr-only'>Enter a drug name (e.g. Mandy, Cocaine, Weed)</label>
                  <div className='input-group--raised d-flex'>
                    <input
                      className={`form-control form-control--search ${!match ? 'underlined' : ''}`}
                      placeholder='Enter a drug name (e.g. Mandy, Cocaine, Weed)'
                      id='search-site'
                      type='text'
                      autoComplete='off'
                      autoCorrect='off'
                      autoCapitalize='off'
                      spellCheck='false'
                      value={searchValue}
                      onChange={this.handleInputChange}
                      />
                    <div className='input-group-append'>
                      <Button
                        className='btn--primary icon-magnifying'
                        clickHandler={this.handleSubmit}
                      >
                        <Svg url='/ui/svg/magnifying.svg' alt='Submit search'/>
                        <span>Search</span>
                      </Button>
                    </div>
                  </div>
                </div>
                { loading &&
                  <p>Searching...</p>
                }
                { (isQueryAQuestion || !hasResults) &&
                  <div className='search__no-results'>
                    <Grid>
                      <GridCol className='col-12 col-sm-10'>
                        <p>Our search isn't clever enough to answer your question yet.</p>
                        <p>Try searching for a drug name (e.g. Mandy, Cocaine, Balloons).
                          If you're still stuck you can contact Frank:</p>
                      </GridCol>
                      <GridCol className='col-12 col-sm-2'>
                        <span className='smilie'>:(</span>
                      </GridCol>
                    </Grid>
                    <hr />
                    <p>Phone: <a href="tel:03001236600">0300 123 6600</a></p>
                    <p>Email: <a href="mailto:03001236600">frank@talktofrank.com</a></p>
                    <p>Text: <a href="sms:82111">82111</a></p>
                  </div>
                }
                { showResults &&
                  <div>
                    { match &&
                      <React.Fragment>
                        {this.getResults(results, match)}
                      </React.Fragment>
                    }
                    { !match &&
                    <React.Fragment>
                      <p className="h4 pink">Did you mean:</p>
                      { this.getResults(results, match) }
                    </React.Fragment>
                    }
                  </div>
                }
              </GridCol>
            </Grid>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

const getHeading = (field, drugName) => {
  const headings = {
    'risks': 'the risks of using %s',
    'effects': 'the effects of using %s',
    'appearance': 'what %s looks like',
    'law': 'what the law says about %s',
    'worried': 'worries of using %s',
    'description.localised': '%s'
  }
  return util.format(headings[field], drugName)
}

const getHeadingLink = (field, drugName) => {
  const headings = {
    'risks': 'risks-of-%s',
    'effects': 'how-does-%s-feel',
    'appearance': 'how-to-recognise-%s',
    'law': 'legal-status-of-%s',
    'worried': 'worried-about-%s',
    'description.localised': '%s'
  }
  return util.format(headings[field], drugName.toLowerCase())
}

const PhraseMatchItem = ({text, drugName, topic, link}) => {
  return (
    <li key={`phraseresultitem-${link}`} className='list-item list-item--dotted'>
      <p className='grey'>
        <a className='underlined' href={`/drug/${drugName.toLowerCase()}#${getHeadingLink(topic, drugName)}`}>
          { getHeading(topic, drugName) }
        </a>
      </p>
      <p dangerouslySetInnerHTML={{__html: text}} />
    </li>
  )
}
