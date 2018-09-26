
import { config } from 'config'

export function isInBrowser () {
  return typeof window !== 'undefined' && window.document
}

export function getApiHost () {
  let apiHost
  if (isInBrowser()) {
    apiHost = window.location.protocol + '//' + window.location.host
  } else {
    apiHost = config.api
  }
  return apiHost
}

export function isArray (obj) {
  return obj.constructor === Array
}

export function isPreviewSite (req) {
  console.log('Req ', req.headers)
  return req.headers.host === 'preview.local.talktofrank.com'
}

export function getContentfulHost (req) {
  return isPreviewSite(req) ? config.contentful.previewHost : config.contentful.contentHost
}

export function getContentfulAccessToken (req) {
  return isPreviewSite(req) ? config.contentful.previewAccessToken : config.contentful.contentAccessToken
}


export function stringContains (haystack, needles) {
  if (isArray(needles)) {
    for (let needle of needles) {
      if (stringContains(haystack, needle)) return true
    }
    return false
  } else {
    return haystack.indexOf(needles) !== -1
  }
}

export function getObjectKeys (obj) {
  let keys = []
  for (let key in obj) {
    if (!obj.hasOwnProperty) { continue }
    keys.push(key)
  }
  return keys
}

export function isEmpty (obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

/**
 * Usage: getIfExists(obj, 'prop1.prop2')
 * Returns undefined if it does not exist
 * @param {*} obj
 * @param {*} key
 */
export function getIfExists (obj, key) {
  return key.split('.').reduce(function (o, x) {
    return (typeof o === 'undefined' || o === null) ? o : o[x]
  }, obj)
}

export function exists (obj, key) {
  return key.split('.').every(function (x) {
    if (typeof obj !== 'object' || obj === null || !(x in obj)) {
      return false
    }
    obj = obj[x]
    return true
  })
}

export function scrollIntoView (node, duration = 300, offset = 80) {
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
