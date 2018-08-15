'use strict'

import axios from 'axios'
import { getApiHost } from './utilities'
import { config } from 'config'

export const REQUEST_PAGE = 'REQUEST_PAGE'
export const RECEIVE_PAGE = 'RECEIVE_PAGE'
export const RECEIVE_PAGE_ERROR = 'RECEIVE_PAGE_ERROR'
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION'

let apiHost = getApiHost()

function requestPage () {
  return {
    type: REQUEST_PAGE
  }
}

export function receivePageError (status) {
  return {
    type: RECEIVE_PAGE_ERROR,
    error: status
  }
}

function receivePage (pageData) {
  return {
    type: RECEIVE_PAGE,
    pageData
  }
}

export function fetchSearchTerm (term) {
  return dispatch => {
    dispatch(requestPage())
    let lookupUrl = apiHost + '/api/v1/search/term/' + term
    return axios.get(lookupUrl)
      .then(res => {
        dispatch(receivePage(res.data))
      })
      .catch(err => {
        let status = err.code === 'ETIMEDOUT' ? 500 : err.response.status
        dispatch(receivePageError(status))
        return Promise.reject(err)
      })
  }
}

export function fetchDrugList () {
  return dispatch => {
    dispatch(requestPage())
    let lookupUrl = apiHost + '/api/v1/drugList'
    return axios.get(lookupUrl)
      .then(res => {
        dispatch(receivePage(res.data))
      })
      .catch(err => {
        let status = err.code === 'ETIMEDOUT' ? 500 : err.response.status
        dispatch(receivePageError(status))
        return Promise.reject(err)
      })
  }
}

export function fetchPage (slug, type = 'pages') {
  return dispatch => {
    dispatch(requestPage())
    let lookupUrl = apiHost + '/api/v1/' + type + '/' + slug
    return axios.get(lookupUrl)
      .then(res => {
        dispatch(receivePage(res.data))
      })
      .catch(err => {
        let status = err.code === 'ETIMEDOUT' ? 500 : err.response.status
        dispatch(receivePageError(status))
        return Promise.reject(err)
      })
  }
}
