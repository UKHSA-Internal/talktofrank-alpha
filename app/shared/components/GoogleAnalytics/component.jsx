import React from 'react'
import ReactGA from 'react-ga'

const GA = ({appID}) => {
  if (typeof window !== 'undefined') {
    if (!window.ga) {
      ReactGA.initialize(appID)
    }
    ReactGA.pageview(window.location.pathname + window.location.search)
  }
  return null
}
export default GA
