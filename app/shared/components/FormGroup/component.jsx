import React from 'react'
import classNames from 'classnames'
import Button from '../Button/component.jsx'
import Svg from '../Svg/component.jsx'

const FormGroup = props => {
  let classes = classNames('input-group', props.className)
  let controlClasses = classNames('form-control', props.modifiers)

  return (
    <div className={classes}>
      <label htmlFor={props.id} className='form-label lead'>{props.label}</label>
      <div className='input-group--raised d-flex'>
        <input className={controlClasses} id={props.id} name={props.name} type={props.type || 'text'}/>
          {props.button && <div className='input-group-append'>
          <Button className='btn--primary icon-magnifying'><span className='sr-only'>Search</span><Svg url='/ui/svg/magnifying.svg' alt='Submit search'/></Button>
        </div>}
      </div>
    </div>
  )
}

export default FormGroup
