import React from 'react'

const Svg = props => {
  return (
    <img src={props.url} className={props.className || null}/>
  )
}

export default Svg
