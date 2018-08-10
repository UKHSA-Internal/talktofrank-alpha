import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'

const PageHome = props => {
  return (
    <React.Fragment>
      <Masthead/>
      <div className='main-wrapper homepage'>
        <Grid>
          <GridCol className='col-12'>

          </GridCol>
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default PageHome
