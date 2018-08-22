import React from 'react'
import Svg from '../Svg/component.jsx'
import Heading from '../Heading/component.jsx'

const Card = props => {
  return (
    <div className='card bg-black'>
      <a href={props.url} className='has-arrow'>
        <Svg url={props.imageUrl} alt='' className='card-img-top'/>
        <div className='card-body'>
          {props.category && <small className='muted'>{props.category}</small>}
          <Heading className='card-title h3 spacing-top--flush' text={props.title}/>
          {props.content && <p className='card-text'>{props.content}</p>}
        </div>
      </a>
    </div>
  )
}

export default Card
