import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/component.jsx'
import Button from '../Button/component.jsx'

const Masthead = props => {
  let classes = classNames('masthead', props.className)

  return (
    <header className={classes} id='header'>
      <div className='masthead__inner container-fluid'>
        <Logo />
        <div className='nav nav--primary'>
          <Button className='navbar-toggler' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </Button>
          <nav className='navbar navbar-expand-md text-center'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item active'>
                <a className='nav-link' href='#'>Link item 1</a>
              </li>
              <li className='nav-item active'>
                <a className='nav-link' href='#'>Link item 1</a>
              </li>
              <li className='nav-item active'>
                <a className='nav-link' href='#'>Link item 1</a>
              </li>
              <li className='nav-item active'>
                <a className='nav-link' href='#'>Link item 1</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Masthead
