import React from 'react'
import { Link } from 'react-router'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import AlphabetList from '../AlphabetList/component.jsx'
import Toggle from '../Toggle/component.jsx'

const DrugList = props => {
  let output = {}

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
        <Grid>
          <GridCol className='col-12 col-sm-8'>
            <ul className='list-unstyled'>
              {output && Object.keys(output).map((val, i) => {
                return (
                  <li id={i}>
                    <Heading type='h3' text={val} modifiers='h4 underlined'/>
                    <ul className='list-unstyled'>
                    {output[val].map((v, index) => {
                      return (
                        <li key={'inner'+index}>
                          <Link to={v.slug}>{v.name}</Link>
                          <p>{v.synonyms}</p>
                          <p className='muted'>{v.description}</p>
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
