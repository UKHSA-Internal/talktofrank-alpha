import React from 'react'
import classNames from 'classnames'
import Longform from '../Longform/component.jsx'

export default class Toggle extends React.Component {
  constructor(props) {
    super(props)
    let showPanel = this.props.className === 'collapsible_trigger--active' ? true : false

    this.state =  {
      visible: showPanel
    }
  }

  toggle(event) {
    event.preventDefault()
    this.setState({ visible: !this.state.visible })
  }

  render() {

    let classes = classNames('collapsible', this.props.className)
    let toggleClass = classNames({
      'collapsible_trigger': true,
      'collapsible_trigger--active': this.state.visible
    })

    return (
      <div className={classes}>
        <a href='#' className={toggleClass} onClick={this.toggle.bind(this)}>
          <Longform text={this.props.text} />
        </a>
        {this.state.visible &&
          <div className='collapsible__content mt-3'>
            {this.props.children}
          </div>
        }
      </div>
    )

  }
}
