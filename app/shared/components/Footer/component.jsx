import React from 'react';
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Button from '../Button/component.jsx'

const Footer = props => {
  return (
    <footer className='footer'>
      <div className='main-wrapper text-center'>
        <Grid>
          <GridCol className='col-12 col-sm-6'>
            <Button className='btn--primary raised' label='Call us: 0300 123 6600'/>
          </GridCol>
          <GridCol className='col-12 col-sm-6'>

          </GridCol>
        </Grid>
        Email us: frank@talktofrank.com
      </div>
    </footer>
  )
}
export default Footer
