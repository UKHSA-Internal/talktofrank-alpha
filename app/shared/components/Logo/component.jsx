import React from 'react'

// @todo @refactor @joel - make this dynamic
const Logo = () => {
  return (
    <div className='logo'>
      <a href='/' className='logo__link'>
        <object data='/ui/svg/logo-frank.svg' type='image/svg+xml' />
      </a>
    </div>
  )
}

export default Logo
