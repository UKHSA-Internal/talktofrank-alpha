import React from 'react'
import Button from '../Button/component.jsx'
import classNames from 'classnames'

const Link = props => {
  let classes = classNames('card', props.className)

  return (
    <div className={classes}>
      <Button href={props.url} className='raised has-chevron btn--link h5'>
        {props.title}
      </Button>
    </div>
  )
}

export default Link
