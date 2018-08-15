import React from 'react'
import classNames from 'classnames'

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
  }

  render () {
    const id = this.props.text.toLowerCase().trim().replace(/ /g, '-')
    let text = this.props.hidden ? <span className='sr-only'>{this.props.text}</span> : this.props.text
    let classes = classNames('collapsible', this.props.className)
    let toggleClass = classNames({
      'collapsible_trigger': true,
      'collapsible_trigger--active': this.state.visible
    })

    return (
      <div className={classes} id={id}>
        {this.state.visible &&
          <div className='collapsible__content'>
            {this.props.children}
          </div>
        }
        <a role='button' href='#' className={toggleClass} onClick={this.toggle.bind(this)} aria-expanded={this.state.visible}>
          {text}
        </a>
      </div>
    )
  }
}
