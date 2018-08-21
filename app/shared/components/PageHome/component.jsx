import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Main from '../Main/component.jsx'
import Heading from '../Heading/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import Form from '../Form/component.jsx'
import Footer from '../Footer/component.jsx'

const PageHome = props => {
  return (
    <React.Fragment>
      <Masthead/>
      <div className='homepage'>
        <Main>
          <section className='panel panel--padding-large has-bg bg-pills'>
            <Grid>
              <GridCol className='col-12 col-md-6'>
                <Heading text='Honest information about drugs' type='h1' modifiers='display-3 spacing-top--flush'/>
              </GridCol>
            </Grid>
          </section>
          <section className='panel panel--padding-large panel--pink'>
            <Form>
              <FormGroup button='true' modifiers='form-control--search' id='search-a-z' label='Ask anything about any drug:'/>
            </Form>
          </section>
          <Grid>
            <GridCol className='col-12'>

            </GridCol>
          </Grid>
        </Main>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default PageHome
