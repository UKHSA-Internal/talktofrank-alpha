import React, { PureComponent } from 'react'
import classNames from 'classnames'
import Button from '../Button/component.jsx'
import Svg from '../Svg/component.jsx'
import Autocomplete from 'react-autocomplete'
import {browserHistory} from 'react-router'
import axios from 'axios'

class FormGroup extends PureComponent {
  constructor () {
    super()
    this.autoCompleteOnChange = this.autoCompleteOnChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      searchTerm: '',
      autoCompleteData: []
    }
  }

  handleSubmit () {
    if (this.state.searchTerm !== '') {
      const searchTerm = this.state.searchTerm
      window.location = `/drug/search/${searchTerm}`
    }
  }

  handleKeyPress (e) {
    if (e.key === 'Enter' && this.state.searchTerm !== '') {
      e.preventDefault()
      const searchTerm = this.state.searchTerm
      window.location = `/drug/search/${searchTerm}`
    }
  }

  fetchSearchResults (value) {
    return axios
      .get(`/api/v1/search/autocomplete/${value}`)
      .then(res => {
        const result = res.data.results ? res.data.results : []
        // eslint-disable-next-line
        this.setState({ autoCompleteData: result })
      })
      .catch(err => console.log(err))
  }

  renderMenuItem (item, isHighlighted) {
    const { showContent, titleClass } = this.props
    const { searchTerm } = this.state

    const regexp = new RegExp('(' + searchTerm + ')', 'ig')
    const searchHighlight = item.name.replace(regexp, '<span class="input-group-autocomplete-menu-item__highlight">$&</span>')

    let linkText = item.name !== item.drug
      ? `${searchHighlight} <span className="input-group-autocomplete-menu-item-drugname">(${item.drug})</span>`
      : searchHighlight

    return (
      <li
        key={`${item.drug} - ${item.name}`}
        className={ isHighlighted ? 'input-group-autocomplete-menu-item__hover' : 'input-group-autocomplete-menu-item ' }
        aria-selected={ isHighlighted }
        role="option"
        tabindex="-1"
      >
        <p className={'mt-1 mb-0 grey ' + titleClass}>
          <span>
            <a href={`/drug/${item.link}`} dangerouslySetInnerHTML={{__html: linkText}}>
            </a>
          </span>
        </p>
        {showContent && <p dangerouslySetInnerHTML={{__html: item.description}}/>}
      </li>
    )
  }

  autoCompleteOnChange (e) {
    const value = e.target.value
    this.setState({
      searchTerm: e.target.value
    }, () => {
      this.fetchSearchResults(value)
    })
  }

  render () {
    let classes = classNames('input-group', this.props.className)
    let controlClasses = classNames('form-control', this.props.modifiers)
    const { searchTerm, autoCompleteData } = this.state
    const { id, labelHidden, label, button } = this.props

    return (
      <div className={classes}>
        <label htmlFor={id}
               className={'form-label h3 ' + (labelHidden ? 'sr-only' : null)}>{label}</label>
        <div className='input-group--raised input-group-autocomplete--raised d-flex'>
          <Autocomplete
            inputProps={{
              className: controlClasses,
              id: id,
              onKeyDown: this.handleKeyPress,
              placeholder: 'Enter a drug name (e.g. Mandy, Cocaine, Balloons)',
              role: false,
              type: 'search'
            }}
            value={searchTerm}
            items={autoCompleteData}
            getItemValue={(item) => item.name}
            onSelect={(value, item) => {
              if (value.trim().length) {
                document.location = '/drug/' + item.link
              }
            }}
            renderMenu={items => {
              return <ul className='input-group-autocomplete-menu' role="listbox" children={items}/>
            }}
            onChange={event => {
              this.autoCompleteOnChange(event)
            }}
            renderItem={(item, isHighlighted) => this.renderMenuItem(item, isHighlighted)}
            required
          />

          {button && <div className='input-group-append'>
            <Button
              className='btn--primary icon-magnifying'
              clickHandler={this.handleSubmit}
            >
              <span className='sr-only'>Submit search</span>
              <Svg url='/ui/svg/magnifying.svg' alt='Submit search'/>
            </Button>
          </div>}
        </div>
      </div>
    )
  }
}

export default FormGroup
