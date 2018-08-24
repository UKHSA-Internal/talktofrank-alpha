import React from 'react'
import classNames from 'classnames'
import { scrollIntoView } from '../../utilities'

export default class Toggle extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: this.props.open || this.props.className === 'collapsible_trigger--active'
    }
  }

  toggle (event) {
    event.preventDefault()
    this.setState({ visible: !this.state.visible })

    if (this.props.history) {
      if ('replaceState' in history) {
        let path = (window.location.hash === event.target.getAttribute('data-target')) ? this.props.history.pathname : event.target.href
        window.history.replaceState({}, document.title, path)
      }
    }
  }

  componentDidMount () {
    if (this.props.history.hash === '#' + this.returnId()) {
      this.setState({ visible: true })
      scrollIntoView(this.node)
    }
  }

  returnId () {
    return this.props.text.toLowerCase().trim().replace(/ /g, '-')
  }

  render () {
    const id = this.returnId()
    let text = this.props.hidden ? <span className='sr-only'>{this.props.text}</span> : this.props.text
    let classes = classNames('collapsible', this.props.className)
    let contentClasses = classNames('collapsible__content', {
      'collapsible__content--active': this.state.visible
    })
    let toggleClass = classNames('collapsible__trigger', {
      'collapsible__trigger--active': this.state.visible
    })

    return (
      <div className={classes} id={id} aria-hidden={!this.state.visible} ref={node => { this.node = node }}>
        <a role='button' href={`#${id}`} data-target={`#${id}`} className={toggleClass} onClick={this.toggle.bind(this)} aria-expanded={this.state.visible}>
          {text}
        </a>
        <div className={contentClasses}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
