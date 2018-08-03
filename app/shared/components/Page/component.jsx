import React from 'react'
import Masthead from '../Masthead/component.jsx'

const Page = props => {
  return (
    <React.Fragment>
      <Masthead />
      {props.components}{props.children}
    </React.Fragment>
  )
}

export default Page
