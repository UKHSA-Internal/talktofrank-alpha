import React from 'react'
import { Link } from 'react-router'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Form from '../Form/component.jsx'
import FormGroup from '../FormGroup/component.jsx'
import Toggle from '../Toggle/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'

const DrugList = props => {
  let output = {}
  const limit = 3

  // get list of beginning numbers / letters
  // really, this is pretty inelegant : /
  let sections = props.list && props.list.map(item => {
    return item.name.substring(0, 1)
  }).filter((value, index, self) => {
    return self.indexOf(value) === index
  }).forEach(v => {
    output[v] = props.list.filter(val => val.name.substring(0, 1) === v)
  })

  return (
    <React.Fragment>
      <Masthead />
      <Main>
        <Heading type='h1' text='Drugs A-Z'/>
        <Heading type='p' modifiers='lead' text='Search for any drug, you can use street names, slang names or the proper name'/>
        <Form>
          <FormGroup button='true' className='input-group--raised' modifiers='form-control--search' id='search-a-z' label='Search for any drug, you can use street names, slang names or the proper name'/>
        </Form>
        <Grid>
          <GridCol className='col-12 col-sm-8'>
            <ul className='list-unstyled' role='list'>
              {output && Object.keys(output).map((val, i) => {
                return (
                <li id={val} key={'outer' + i}>
                  <Heading text={val} modifiers='display-2 underlined underlined--offscreen'/>
                  <ul className='list-unstyled'>
                  {output[val].map((v, index) => {
                    let synonyms
                    let name = v.parent ? <span>{v.name} <span className='muted smaller'>({v.parent})</span></span> : <span>{v.name}</span>
                    if (v.synonyms) {
                      let item = v.synonyms.split(',')
                      synonyms = item.length > limit ? `${item.splice(0, limit).join(', ')} +${item.length} more` : item.join(', ')
                    }

                    return (
                    <li key={'inner' + index} className='underlined underlined--dotted'>
                      <a href={v.slug}><h3 className='h4 grey'>{name}</h3>
                      {synonyms && <p className='grey'>Also called: {synonyms}</p>}
                      <p><span className='muted'>{v.description}</span></p>
                      </a>
                    </li>)
                  })}
                  </ul>
                </li>)
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
