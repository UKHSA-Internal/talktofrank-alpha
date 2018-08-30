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
    this.state = {
      searchTerm: '',
      autoCompleteData: []
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
        const result = res.data.results
        // eslint-disable-next-line
        this.setState({ autoCompleteData: result })
      })
      .catch(err => console.log(err))
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
    const { id, labelHidden, label, button, showContent, titleClass } = this.props

    return (
      <div className={classes}>
        <label htmlFor={id}
               className={'form-label h3 ' + (labelHidden ? 'sr-only' : null)}>{label}</label>
        <div className='input-group--raised input-group-autocomplete--raised d-flex'>
          <Autocomplete
            inputProps={{
              className: controlClasses,
              id: id,
              onKeyDown: this.handleKeyPress
            }}
            value={searchTerm}
            items={autoCompleteData}
            getItemValue={(item) => item.name}
            onSelect={value => {
              this.setState({
                searchTerm: value
              })
            }}
            renderMenu={items => {
              return <div className='input-group-autocomplete-menu' children={items}/>
            }}
            onChange={event => {
              this.autoCompleteOnChange(event)
            }}
            renderItem={(item, isHighlighted) => (
              <div
                key={`${item.drug} - ${item.name}`}
                className={ isHighlighted ? 'input-group-autocomplete-menu-item--hover' : 'input-group-autocomplete-menu-item ' }
              >
                <p className={'mt-1 mb-0 grey ' + titleClass}>
                  <span><a href={`/drug/${item.link}`}>{item.name}</a>{' '}
                  { item.name !== item.drug && <span className="muted smaller">({item.drug})</span>}
                  </span>
                </p>
                {showContent && <p dangerouslySetInnerHTML={{__html: item.description}}/>}
              </div>
            )}
            required
          />

          {button && <div className='input-group-append'>
            <Button className='btn--primary icon-magnifying'><span
              className='sr-only'>Submit search</span><Svg
              url='/ui/svg/magnifying.svg' alt='Submit search'/></Button>
          </div>}
        </div>
      </div>
    )
  }
}

export default FormGroup
