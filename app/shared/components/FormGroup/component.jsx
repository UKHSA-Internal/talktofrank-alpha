import React from 'react'
import classNames from 'classnames'
import FormHint from '../FormHint/component.jsx'

const FormGroup = props => {
  let classes = classNames('form-group', props.className, props.modifiers)
  let attrs = {}
  // @todo - extend this to accept an array / object of attributes - perhaps...
  if (props.attr) {
    attrs[props.attr.key] = props.attr.value
  }

  return (
    <div className={classes}>
      <label className='form-label' htmlFor={props.id}>{props.label}
        {props.supporting && <FormHint>{props.supporting}</FormHint>}
      </label>
      <input className='form-control' id={props.id} name={props.name} type={props.type || 'text'} {...attrs} value={props.value || ''}/>
    </div>
  )
}

export default FormGroup
