import React from 'react'

const Form = props => {
  return (
    <form className='form' action={props.action}>
      {props.children}
    </form>
  )
}

export default Form
