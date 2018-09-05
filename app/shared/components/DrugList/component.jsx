import React from 'react'
import { Link } from 'react-router'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Form from '../Form/component.jsx'
import Toggle from '../Toggle/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import FormGroupAutocomplete from '../FormGroupAutocomplete/component.jsx'

const DrugList = props => {
  const limit = 4

  return (
    <React.Fragment>
      <Masthead />
      <Main>
        <Heading type='h1' text='Drugs A-Z'/>
          <Form>
            <FormGroupAutocomplete
              button='true'
              modifiers='form-control--search'
              className='input-group-autocomplete--inverse'
              id='search-a-z'
              label='Search for any drug, you can use street names, slang names or the proper name'
              showContent
              titleClass='h4'
              placeholder='Enter a drug name (e.g. Mandy, Cocaine, Weed)'
              resultsId='masthead-results'
            />
          </Form>
        <Grid>
          <GridCol className='col-12 col-sm-8'>
            <ul className='list-unstyled' role='list'>
              {props.list.map((val, i) => {
                return (
                  <li id={val.group} key={'outer' + i}>
                    <Heading text={val.group} modifiers='display-2 underlined underlined--offscreen'/>
                    <ul className='list-unstyled'>
                    {val.values.map((v, index) => {
                      let synonyms
                      let name = v.parent ? v.name : <span className='inverted'>{v.name}</span>
                      let realName = v.parent ? <span className='italic'>Real name: <strong>{v.parent}</strong></span> : null

                      if (v.synonyms) {
                        let item = v.synonyms.split(',')
                        synonyms = item.length > limit ? `${item.splice(0, limit).join(' / ')} +${item.length} more` : item.join(' / ')
                      }

                      return (
                      <li key={'inner' + index} className='list-item list-item--dotted'>
                        <a href={v.slug} className='list-link'><h3 className='h4 mt-1 mb-0 grey'>{name}</h3>
                        {synonyms && <p className='grey'>Also called: {synonyms}</p>}
                        {realName}
                        {v.description && <p><span className='muted'>{v.description}</span></p>}
                        </a>
                      </li>)
                    })}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </GridCol>
        </Grid>
      </Main>
      <Footer />
    </React.Fragment>
  )
}
export default DrugList
