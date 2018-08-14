import React from 'react'
import classNames from 'classnames'

const FormHint = props => {
  let classes = classNames('form-hint', props.className, props.modifiers)

  return (
    <span className={classes} dangerouslySetInnerHTML={{__html: props.children}} />
  )
}

export default FormHint
