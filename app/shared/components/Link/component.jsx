import React from 'react'

const Link = props => {
  return (
    <div className='card'>
      <a href={props.url} className='raised has-arrow'>
        {props.title}
      </a>
    </div>
  )
}

export default Link
