import React from 'react'
import { Link } from 'react-router'

const Page = props => {
  return (
    <React.Fragment>
      <h1>A-Z</h1>
      {props.components}{props.children}
      <ul>
        { props.list.map((item, key) => (
          <li key={`drug-${key}`}>
            <a href={item.slug}>{item.name}</a>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default Page
