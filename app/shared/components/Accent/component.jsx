import React from 'react'
import classNames from 'classnames'

const Accent = props => {
  let classes = classNames('accent spacing--large', props.className)

  return (
    <section className={classes}>
      <div className='container container-fluid'>
        {props.children}
      </div>
    </section>
  )
}

export default Accent
