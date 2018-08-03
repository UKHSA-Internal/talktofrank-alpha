import React from 'react'
import classNames from 'classnames'

export default class Button extends React.Component {
  onClick (event) {
    const { clickHandler } = this.props

    if (!clickHandler) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const handler = clickHandler()
  }

  render () {
    let component
    let data = {}
    let { children, url, label, type, modifiers } = this.props
    let classes = classNames('btn', this.props.className, modifiers, {
      'loading': this.props.disabled && this.props.loading
    })

    // list out data- and aria- attributes and stick em in
    for (const prop in this.props) {
      if (/^data-/.test(prop) || /^aria-/.test(prop)) {
        data[prop] = this.props[prop]
      }
    }

    let id = this.props.id ? {'id': [this.props.id]} : null
    let disabled = !!this.props.disabled

    if (url || type === 'a') {
      component = (
        <a href={url}
          className={classes}
          role='button'
          {...data}
          {...id}
          onClick={event => this.onClick(event)}>
          {children}{label}</a>
      )
    } else {
      component = (
        <button
          disabled={disabled}
          {...data}
          {...id}
          onClick={event => this.onClick(event)}
          className={classes} type={type}>
          {children}{label}
        </button>
      )
    }

    return component
  }
}
