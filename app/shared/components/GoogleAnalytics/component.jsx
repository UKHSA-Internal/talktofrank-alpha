import React from 'react'
import ReactGA from 'react-ga'

const GA = props => {
  if (typeof window !== 'undefined') {
    if (!window.ga) {
      ReactGA.initialize('UA-126357409-1')
    }
    ReactGA.pageview(window.location.pathname + window.location.search)
  }
  return null
}
export default GA
