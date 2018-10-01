import React from 'react'
import classNames from 'classnames'
import Button from '../Button/component.jsx'

const ButtonGroup = props => {
  let classes = classNames('button-group', props.modifiers)
  let buttons = props.buttons ? props.buttons.map((v, i) => <Button {...v} key={i}/>) : null

  return (
    <div className={classes}>
      {buttons}{props.children}
    </div>
  )
}

export default ButtonGroup
