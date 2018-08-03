import React from 'react'
import classNames from 'classnames'

const Grid = props => {
  let classes = classNames('grid-row', props.className, props.modifiers)

  return (
    <div className={classes}>
      {props.children}
    </div>
  )
}

export default Grid
