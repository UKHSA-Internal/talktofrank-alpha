import React from 'react'
import Link from '../Link/component.jsx'
import classNames from 'classnames'

const LinkDeck = props => {
  let classes = classNames('card-deck card-deck--light', props.className)

  return (
    <div className={classes}>
      {props.teasers && props.teasers.map((val, i) => <Link key={i} {...val} className='card--quiet'/>)}
    </div>
  )
}

export default LinkDeck
