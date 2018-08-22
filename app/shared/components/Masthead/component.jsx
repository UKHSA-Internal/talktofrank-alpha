import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/component.jsx'
import Button from '../Button/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import Form from '../Form/component.jsx'

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
        <div className='masthead__inner constrain-narrow'>
          <Button className='float-left d-block d-md-none mt-4 navbar-toggler' aria-controls='navigation' aria-expanded={this.state.mobileMenuOpen} aria-label='Toggle navigation' clickHandler={this.handleMenuClick.bind(this)}>
            <span className='sr-only'>Menu</span>
          </Button>
          <Logo url='/ui/img/logo-frank.png' alt='Frank logo'/>
          <nav className={navClasses} id='navigation'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <a className='nav-link' href='#'>News</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>Help for you</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>Help for others</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/drug'>Drugs A-Z</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>Contact Frank</a>
              </li>
            </ul>
            <Form className='ml-auto'>
              <FormGroup button='true' modifiers='form-control--search' id='search-masthead' label=''/>
            </Form>
          </nav>
        </div>
      </section>
    )
  }
}
