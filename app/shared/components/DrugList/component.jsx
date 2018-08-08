import React from 'react'
import { Link } from 'react-router'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'

const DrugList = props => {
  return (
    <React.Fragment>
      <Masthead />
      <div className='main-wrapper'>

        <h1>A-Z</h1>
        <Grid>
          <GridCol className='col-12 col-sm-8'>
            <ul>
              {props.list && props.list.map((item, key) => (
                <li key={`drug-${key}`}>
                  <Link to={item.slug}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </GridCol>
        </Grid>
      </div>
    </React.Fragment>
  )
}
export default DrugList
