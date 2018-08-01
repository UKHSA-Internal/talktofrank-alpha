
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

// a silly little map to gauge class names for grid columns
export const mapper = {
  1: 'full',
  2: 'half',
  3: 'third',
  4: 'quarter',
  5: 'fifth',
  6: 'sixth'
}
