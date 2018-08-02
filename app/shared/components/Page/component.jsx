import React from 'react'

const Page = props => {
  return (
    <React.Fragment>
      {props.components}{props.children}
      <h1>{props.name}</h1>
      <h5>{props.synonyms}</h5>
      <div dangerouslySetInnerHTML={{__html: props.description}} />
    </React.Fragment>
  )
}

export default Page
