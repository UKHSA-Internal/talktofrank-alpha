import React from 'react'

const Heading = props => {
  const Tag = `${props.type || 'h2'}`

  return (
    <Tag className={props.modifiers}><span dangerouslySetInnerHTML={{__html: props.text}}></span></Tag>
  )
}

export default Heading
