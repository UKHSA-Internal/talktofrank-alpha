import React from 'react'
import Card from '../Card/component.jsx'
import classNames from 'classnames'

const CardDeck = props => {
  let classes = classNames('card-deck', props.className, props.modifiers)

  return (
    <div className={classes}>
      {props.teasers && props.teasers.map((val, i) => <Card key={i} {...val}/>)}
    </div>
  )
}

export default CardDeck
