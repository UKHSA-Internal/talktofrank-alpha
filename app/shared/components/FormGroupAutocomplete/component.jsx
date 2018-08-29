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
    const { searchTerm } = this.state
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
              onKeyDown: this.handleKeyPress
            }}
            value={searchTerm}
            items={this.state.autoCompleteData}
            getItemValue={(item) => item.name}
            onSelect={value => {
              this.setState({
                searchTerm: value
              })
            }}
            menuStyle={{
              maxWidth: '714px',
              position: 'absolute',
              overflow: 'auto',
              top: '97px',
              left: '0px',
              width: '97%',
              border: '3px solid #78FF74',
              borderTop: '0',
              zIndex: 1
            }}
            onChange={event => {
              this.autoCompleteOnChange(event)
            }}
            renderItem={(item, isHighlighted) => (
              <div
                key={item.name}
                style={{ background: isHighlighted ? '#fcfcfc' : 'white' }}
                className='input-group-autocomplete-item'
              >
                <h3 className="h4 mt-1 mb-0 grey">
                  <span><a href={`/drug/${item.link}`}>{item.name}</a>{' '}
                  { item.name !== item.drug && <span className="muted smaller">({item.drug})</span>}
                  </span>
                </h3>
                <p dangerouslySetInnerHTML={{__html: item.description}}/>
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
