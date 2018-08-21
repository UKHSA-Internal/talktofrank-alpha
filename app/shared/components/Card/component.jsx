import React from 'react'
import Svg from '../Svg/component.jsx'

const Card = props => {
  return (
    <div className='card bg-black'>
      <a href={props.url} className='has-arrow'>
        <Svg url={props.imageUrl} alt='' className='card-img-top'/>
        <div className='card-body'>
          {props.category && <small className='muted'>{props.category}</small>}
          <h3 className='card-title h3 spacing-top--flush'>{props.title}</h3>
          <p className='card-text'>{props.content}</p>
        </div>
      </a>
    </div>
  )
}

export default Card
