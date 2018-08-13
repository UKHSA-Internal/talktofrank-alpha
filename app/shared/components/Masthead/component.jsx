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
    this.setState({
      mobileMenuOpen: !this.state.mobileMenuOpen
    })
  }

  render () {
    let classes = classNames('masthead', this.props.className)
    let navClasses = classNames('navbar navbar-expand-md', {
      'd-none': !this.state.mobileMenuOpen
    })

    return (
      <section className={classes}>
        <div className='masthead__inner container-fluid'>
          <Button className='float-left d-block d-md-none mt-4 navbar-toggler' aria-controls='navigation' aria-expanded='false' aria-label='Toggle navigation' clickHandler={this.handleMenuClick.bind(this)}>
            {/*<span className='navbar-toggler-icon'>Menu</span>*/}
          </Button>
          <Logo url='/ui/svg/logo-frank.svg' className='d-block d-md-none'/>
          <Logo url='/ui/svg/logo-frank-inverted.svg' className='d-none d-md-block'/>
          <div className={navClasses}>
            <nav className='navbar text-center' id='navigation'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item active'>
                  <a className='nav-link' href='/drug'>Drugs A-Z</a>
                </li>
                <li className='nav-item active'>
                  <a className='nav-link' href='#'>Drugs news</a>
                </li>
                <li className='nav-item active'>
                  <a className='nav-link' href='#'>Help for you</a>
                </li>
                <li className='nav-item active'>
                  <a className='nav-link' href='#'>Help for others</a>
                </li>
                <li className='nav-item active'>
                  <a className='nav-link' href='#'>Contact Frank</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    )
  }
}
