import React from 'react'
import classNames from 'classnames'

const Grid = props => {
  let classes = classNames('row', props.className)

  return (
    <div className={classes}>
      {props.children}
    </div>
  )
}

export default Grid
