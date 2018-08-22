import React from 'react'
import Button from '../Button/component.jsx'

const Footer = props => {
  return (
    <footer className='footer'>
      <div className='content-wrapper text-center spacing-bottom--large'>
        <Button className='btn--primary btn--large raised mb-5' label='Call us: 0300 123 6600'/>
        <p>Email us: <a href='mailto:frank@talktofrank.com'>frank@talktofrank.com</a></p>
        <p>Text us: <a href='tel:82111'>82111</a></p>
        <p><a href='#'>Find a support centre</a></p>
        <nav className='navbar navbar-expand-md text-center spacing-top--large' id='navigation-footer'>
          <ul className='navbar-nav mr-auto ml-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='#'>Site Policy</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>Accessibility</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/drug'>Disclaimer</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>Cookie policy</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
export default Footer
