import React from 'react'
import { Link } from 'react-router'

const DrugList = props => {
  return (
    <div>
      <h1>A-Z</h1>
      <ul>
        {props.list && props.list.map((item, key) => (
          <li key={`drug-${key}`}>
            <Link to={item.slug}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default DrugList
