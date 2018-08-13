import React from 'react'

const Svg = props => {
  return (
    <object data={props.url} type='image/svg+xml' className={props.className || null}/>
  )
}

export default Svg
