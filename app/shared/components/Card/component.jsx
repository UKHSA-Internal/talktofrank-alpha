import React from 'react'

const CardDeck = props => {
  return (
    <div className='card-deck'>
      {props.children}
    </div>
  )
}

export default CardDeck
