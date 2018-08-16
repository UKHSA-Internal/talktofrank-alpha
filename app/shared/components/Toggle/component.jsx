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
      this.scrollIntoView(this.node)
    }
  }

  scrollIntoView (node, duration = 300, offset = 80) {
    document.documentElement.scrollTop = 0
    const start = document.documentElement.scrollTop
    const change = (node.getBoundingClientRect().top - offset) - start
    const increment = 20
    let currentTime = 0
    let timerid

    const animateScroll = () => {
      currentTime += increment
      const val = Math.easeInOutQuad(currentTime, start, change, duration)
      document.documentElement.scrollTop = val

      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      }
    }

    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

    if (timerid) {
      clearTimeout(timerid)
    }

    timerid = setTimeout(() => {
      animateScroll()
    }, duration)
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
      <div className={classes} id={id} ref={node => { this.node = node }}>
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
