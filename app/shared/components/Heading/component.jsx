import React from 'react'
import classNames from 'classnames'

const Heading = props => {
  const Tag = `${props.type || 'h2'}`
  let classes = classNames(props.className, props.modifiers)
  return (
    <Tag className={classes} dangerouslySetInnerHTML={{__html: props.text}}></Tag>
  )
}

export default Heading
