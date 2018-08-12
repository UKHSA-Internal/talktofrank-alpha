import React from 'react'
import classNames from 'classnames'

const Banner = props => {
  let classes = classNames('title', props.className)
  return (
    <header className={classes} id='header' role='banner'>
      {props.children}
    </header>
  )
}

export default Banner
