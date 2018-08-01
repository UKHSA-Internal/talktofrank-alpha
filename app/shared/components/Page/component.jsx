import React from 'react'

const Page = props => {
  return (
    <React.Fragment>
      {props.components}{props.children}
    </React.Fragment>
  )
}

export default Page
