import React from 'react'

const PageStatic = props => {
  return (
    <React.Fragment>
      <h1>{ props.content[0].title }</h1>
      <h1>{ props.content[1].text }</h1>
      {props.components}{props.children}
    </React.Fragment>
  )
}

export default PageStatic
