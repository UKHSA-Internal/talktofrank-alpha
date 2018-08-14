import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Main from '../Main/component.jsx'

const PageHome = props => {
  return (
    <React.Fragment>
      <Masthead/>
      <Main className='homepage'>
        <Grid>
          <GridCol className='col-12'>

          </GridCol>
        </Grid>
      </Main>
    </React.Fragment>
  )
}

export default PageHome
