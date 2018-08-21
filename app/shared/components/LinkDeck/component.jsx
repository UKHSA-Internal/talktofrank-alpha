import React from 'react'
import Link from '../Link/component.jsx'
import classNames from 'classnames'

const LinkDeck = props => {
  let classes = classNames('card-deck card-deck--light', this.props.className)

  return (
    <div className={classes}>
      {props.teasers && props.teasers.map((val, i) => <Link key={i} {...val}/>)}
    </div>
  )
}

export default LinkDeck
