/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */

import React, { Component } from 'react'
import ReactGA from 'react-ga'
import { config } from 'config'

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options
    })
    ReactGA.pageview(page)
  }

  const HOC = class extends PureComponent {
    componentDidMount () {
      const page = this.props.location.pathname
      if (typeof window !== 'undefined') {
        if (!window.ga) {
          ReactGA.initialize(config.ga)
        }
      }
      trackPage(page)
    }

    componentWillReceiveProps (nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}
export default withTracker
