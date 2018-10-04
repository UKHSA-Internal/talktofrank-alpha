import React from 'react'
import classNames from 'classnames'
import LinkItem from '../LinkItem/component.jsx'

const Nav = props => {
  let classes = classNames('navbar', props.className)

  return (
    <nav className={classes} id={props.id}>
      <ul className='navbar-nav' role='menu'>
        <LinkItem url='#' role="menuitem" label='News'/>
        <LinkItem url='#' role="menuitem" label='Help for you'/>
        <LinkItem url='#' role="menuitem" label='Help for others'/>
        <LinkItem url='/drug' role="menuitem" label='Drugs A-Z'/>
        <LinkItem url='#' role="menuitem" label='Contact Frank'/>
      </ul>
    </nav>
  )
}
export default Nav
