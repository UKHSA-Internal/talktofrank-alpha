import React from 'react'

const Heading = props => {
  const Tag = `${props.type || 'h2'}`

  return (
    <Tag className={props.className} dangerouslySetInnerHTML={{__html: props.text}}></Tag>
  )
}

export default Heading
