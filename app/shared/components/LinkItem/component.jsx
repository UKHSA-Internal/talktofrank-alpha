import React from 'react'
const LinkItem = props => {
  return (
    <li className='nav-item'>
      <a className='nav-link' href={props.url} role={props.role}>{props.label}</a>
    </li>
  )
}
export default LinkItem
