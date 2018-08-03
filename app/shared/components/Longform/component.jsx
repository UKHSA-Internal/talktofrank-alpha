import React from 'react'
import classNames from 'classnames'

const Longform = props => {
  let {text, intro, modifiers} = props
  let classes = classNames('long-form', props.className, props.modifiers)

  return (
    <React.Fragment>
      {intro && <p className={props.modifiers || 'lede'}>{intro}</p>}
      {text && <div className={classes} dangerouslySetInnerHTML={{__html: text}} />}
    </React.Fragment>
  )
}

export default Longform
