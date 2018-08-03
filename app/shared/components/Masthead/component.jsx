import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/component.jsx'
import Button from '../Button/component.jsx'

const Masthead = props => {
  let classes = classNames('masthead', props.className)

  return (
    <header className={classes} id='header'>
      <div className='masthead__inner container-fluid'>
        <div className='logo'>
          <Logo />
        </div>
        <div className='nav nav--primary'>
          <Button url='#primary-navigation' className='btn menu-toggle menu-toggle--active'/>
          <nav id='primary-navigation'>
            <ul className='nav--primary__items'>
              <li><a href='#'>Link item 1</a></li>
              <li><a href='#'>Link item 2</a></li>
              <li><a href='#'>Link item 2</a></li>
              <li><a href='#'>Link item 2</a></li>
            </ul>

          </nav>
        </div>
      </div>
    </header>
  )
}

export default Masthead
