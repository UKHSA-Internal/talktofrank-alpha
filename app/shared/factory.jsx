import React from 'react'
import Longform from './components/Longform/component'
import Heading from './components/Heading/component'

export function factory (pageData) {
  let contentItems = pageData.content

  if (!contentItems || contentItems.length === 0) {
    return
  }

  let reactComponents = []

  if (!contentItems) {
    return null
  }

  for (let i = 0; i < contentItems.length; i++) {
    let item = contentItems[i]
    let reactComponent

    switch (item.contentType) {
      case 'heading':
        reactComponent = <Heading {...item} key={i} />
        break
      case 'longform':
        reactComponent = <Longform {...item} key={i} />
        break
      default:
        console.error('Could not match ' + item.contentType)
        continue
    }
    reactComponents.push(reactComponent)
  }
  return reactComponents
}
