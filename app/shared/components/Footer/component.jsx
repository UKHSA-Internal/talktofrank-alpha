import React from 'react'
import Button from '../Button/component.jsx'
import LinkItem from '../LinkItem/component.jsx'

const Footer = props => {
  return (
    <footer className='footer spacing-bottom--large' role='contentinfo'>
      <div className='text-center'>
        <Button className='btn--primary btn--large raised mb-5' url='tel:0300 123 6600' label='Call us: 0300 123 6600' />
        <p>Email us: <a href='mailto:frank@talktofrank.com'>frank@talktofrank.com</a></p>
        <p>Text us: <a href='tel:82111'>82111</a></p>
        <p><a href='#'>Find a support centre</a></p>
        <nav className='navbar navbar-expand-md text-center spacing-top--large' id='navigation-footer'>
          <ul className='navbar-nav mr-auto ml-auto'>
            <LinkItem url='#' label='Site Policy'/>
            <LinkItem url='#' label='Accessibility'/>
            <LinkItem url='#' label='Disclaimer'/>
            <LinkItem url='#' label='Cookie policy'/>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
export default Footer
