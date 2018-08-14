import React from 'react'
import Svg from '../Svg/component.jsx'

// @todo @refactor @joel - make this dynamic
const Logo = props => {
  return (
    <div className={'logo ' + props.className}>
      <a href='/' className='logo__link'>
        <Svg url={props.url}/>
      </a>
    </div>
  )
}

export default Logo
