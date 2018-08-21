import React from 'react'
import Button from '../Button/component.jsx'

const Footer = props => {
  return (
    <footer className='footer'>
      <div className='content-wrapper constrain-narrow text-center'>
        <Button className='btn--primary btn--large btn--raised mb-5' label='Call us: 0300 123 6600'/>
        <p>Email us: <a href='mailto:frank@talktofrank.com'>frank@talktofrank.com</a></p>
        <p>Text us: <a href='tel:82111'>82111</a></p>
        <p><a href='#'>Find a support centre</a></p>
      </div>
    </footer>
  )
}
export default Footer
