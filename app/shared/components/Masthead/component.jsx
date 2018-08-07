import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/component.jsx'
import Button from '../Button/component.jsx'

export default class Masthead extends React.PureComponent {
  constructor () {
    super()

    this.state = {
      mobileMenuOpen: false
    }
  }

  handleMenuClick () {
    var nextState

    if (this.state.mobileMenuOpen) {
      document.body.classList.remove('js-offcanvas-menu-visible')
      nextState = false
    } else {
      document.body.classList.add('js-offcanvas-menu-visible')
      nextState = true
    }

    this.setState({
      mobileMenuOpen: nextState
    })
  }

  render () {
    let classes = classNames('masthead', this.props.className)

    return (

      <header className={classes} id='header'>
        <div className='masthead__inner container-fluid'>
          <Logo />
          <div className='nav nav--primary'>
{/*            <Button className='navbar-toggler hidden-sm-up' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation' clickHandler={this.handleMenuClick.bind(this)}>
              <span className='navbar-toggler-icon'>MENU</span>
            </Button>*/}
            <nav className='navbar navbar-expand-md text-center' id='navbarSupportedContent'>
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
}
