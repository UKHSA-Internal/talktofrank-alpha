import React from 'react'
import { Link } from 'react-router'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Form from '../Form/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import Toggle from '../Toggle/component.jsx'

const DrugList = props => {
  let output = {}
  const limit = 3

  // remove all but parent drugs
  let listing = props.list && props.list.filter(item => {
    return !item.parent
  })

  // get list of beginning numbers / letters
  // really, this is pretty inelegant : /
  let sections = listing && listing.map(item => {
    return item.name.substring(0, 1)
  }).filter((value, index, self) => {
    return self.indexOf(value) === index
  }).forEach(v => {
    output[v] = listing.filter(val => val.name.substring(0, 1) === v)
  })

  return (
    <React.Fragment>
      <Masthead />
      <div className='main-wrapper'>
        <Heading type='h1' text='Drugs A-Z'/>
        <Heading type='p' modifiers='lead' text='Search for any drug, you can use street names, slang names or the proper name'/>
        <Form>
          <FormGroup />
        </Form>
        <Grid>
          <GridCol className='col-12 col-sm-8'>
            <ul className='list-unstyled'>
              {output && Object.keys(output).map((val, i) => {
                return (
                  <li id={val} key={'outer'+i}>
                    <Heading text={val} modifiers='h1 underlined underlined--offscreen'/>
                    <ul className='list-unstyled'>
                    {output[val].map((v, index) => {
                      let syn = v.synonyms.split(',')
                      let synonyms = syn.length > limit ? `${syn.splice(0, limit).join(', ')} +${syn.length} more` : syn.join(', ')

                      return (
                        <li key={'inner'+index} className='underlined underlined--dotted'>
                          <Link to={v.slug}><Heading type='h3' text={v.name} modifiers='h4 grey'/>
                          {syn.length && <p className='grey'>Also called: {synonyms}</p>}
                          <p><span className='muted'>{v.description}</span></p>
                          </Link>
                        </li>)
                    })}
                    </ul>
                  </li>)
                })
              }

            </ul>
          </GridCol>
        </Grid>
      </div>
    </React.Fragment>
  )
}
export default DrugList
