import React from 'react'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Button from '../Button/component.jsx'

const Footer = props => {
  return (
    <footer className='footer'>
      <div className='content-wrapper text-center'>
        <Grid>
          <GridCol className='col-12 col-sm-6'>
            <Button className='btn--primary btn--large btn--raised' label='Call us: 0300 123 6600'/>
          </GridCol>
          <GridCol className='col-12 col-sm-6'>
            <p>Email us: <a href='mailto:frank@talktofrank.com'></a></p>
            <p>Text us: <a href='tel:82111'></a></p>
          </GridCol>
        </Grid>
      </div>
    </footer>
  )
}
export default Footer
