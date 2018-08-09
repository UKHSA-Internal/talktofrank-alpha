import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'

export default class SearchPage extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      searchValue: ''
    }
  }

  handleInputChange (e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({
      searchValue: e.target.value
    })
    this.props.searchForTerm(e.target.value)
  }

  render () {
    const { results } = this.props
    const { searchValue } = this.state
    return (
      <React.Fragment>
        <Masthead/>
        <div className='main-wrapper'>
          <h1>Search</h1>
          <Grid>
            <GridCol className='col-12 col-sm-8 search'>
              <input
                type="text"
                value={searchValue}
                onChange={this.handleInputChange}
                placeholder="Start typing"
                style={{width: '100%'}}
                className="search__input"
              />
              { results && results.length > 0 && (
                <ul className="search__list">
                  { results.map(item => (
                    <li className="search__list-item">
                      <p className="h3">{item._source.title}</p>
                      <p className="lead muted">{item.highlight.synonyms ? (<span dangerouslySetInnerHTML={{__html: item.highlight.synonyms}} />) : (item._source.synonyms)}</p>
                      <p>{item.highlight.description ? (<span dangerouslySetInnerHTML={{__html: item.highlight.description}} />) : (item._source.description)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </GridCol>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}
