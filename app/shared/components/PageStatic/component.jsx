import React from 'react'

const PageStatic = props => {
  return (
    <React.Fragment>
      {props.components}{props.children}
    </React.Fragment>
  )
}

export default PageStatic
