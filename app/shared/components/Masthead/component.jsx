import React from 'react'
import classNames from 'classnames'
import Logo from '../Logo/component.jsx'
import Button from '../Button/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import Form from '../Form/component.jsx'
import LinkItem from '../LinkItem/component.jsx'

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
          <Button className='float-left d-block d-md-none mt-4 navbar-toggler' aria-controls='navigation' aria-expanded={this.state.mobileMenuOpen} aria-label={this.state.mobileMenuOpen ? 'Hide navigation' : 'Reveal navigation'} clickHandler={this.handleMenuClick.bind(this)}>
            <span className='sr-only'>Menu</span>
          </Button>
          <Logo url='/ui/img/logo-frank.png' alt=''/>
          <nav className={navClasses} id='navigation'>
            <ul className='navbar-nav'>
              <LinkItem url='#' label='News'/>
              <LinkItem url='#' label='Help for you'/>
              <LinkItem url='#' label='Help for others'/>
              <LinkItem url='/drug' label='Drugs A-Z'/>
              <LinkItem url='#' label='Contact Frank'/>
            </ul>
            <Form className='ml-auto'>
              <FormGroup button='true' modifiers='form-control--search' id='search-masthead' label='Search site' labelHidden='true'/>
            </Form>
          </nav>
        </div>
      </section>
    )
  }
}
