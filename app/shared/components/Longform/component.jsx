import React from 'react'
import classNames from 'classnames'

const Longform = props => {
  let {text, modifiers} = props
  let classes = classNames('long-form', props.className)

  return (
    <React.Fragment>
      {text && <div className={classes} dangerouslySetInnerHTML={{__html: text}} />}
    </React.Fragment>
  )
}

export default Longform
