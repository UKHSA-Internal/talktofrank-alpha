import React from 'react'
import Svg from '../Svg/component.jsx'

// @todo @refactor @joel - make this dynamic
const Logo = () => {
  return (
    <div className='logo'>
      <a href='/' className='logo__link'>
        <Svg url='/ui/svg/logo-frank.svg'/>
      </a>
    </div>
  )
}

export default Logo
