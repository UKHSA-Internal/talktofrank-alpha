import React from 'react'
import { Link } from 'react-router'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Heading from '../Heading/component.jsx'
import Form from '../Form/component.jsx'
import Button from '../Button/component.jsx'
//import FormGroup from '../FormGroup/component.jsx'
import Svg from '../Svg/component.jsx'
import Toggle from '../Toggle/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'
import Autocomplete from 'react-autocomplete'
import { fakeRequest } from '../../../../fixtures/data.js'

export default class DrugList extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
      items: [],
      loading: false
    }
    this.requestTimer = null
  }

  render () {
    const limit = 3

    return (
      <React.Fragment>
        <Masthead />
        <Main>
          <Heading type='h1' text='Drugs A-Z'/>
          <Form>
            <div className='input-group'>
              <label htmlFor='form-search' className='form-label lead'>Search for any drug, you can use street names, slang names or the proper name</label>
              <div className='input-group--raised d-flex'>
                <Autocomplete
                  value={this.state.value}
                  inputProps={{ id: 'autocomplete', className: 'form-control form-control--search', autoComplete: 'off' }}
                  items={this.state.items}
                  getItemValue={(item) => item.name}
                  onSelect={(value, state) => this.setState({ value, items: [state] }) }
                  onChange={(event, value) => {
                    this.setState({ value, loading: true, items: [] })
                    clearTimeout(this.requestTimer)
                    this.requestTimer = fakeRequest(value, (items) => {
                      this.setState({ items: items, loading: false })
                    })
                  }}
                  renderItem={(item, isHighlighted) => {

                    console.log(item, isHighlighted)
                    return (
                    item.header ?
                      <li
                        className='item item-header'
                        key={item.header}
                      >{item.header}</li>
                      : <li
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                        key={item.id}
                      >{item.name}</li>
                  )}}
                  renderMenu={(items, value) => (
                    <ul className='autocomplete-list'>
                      {value === '' ? (
                        <li className='item'>Did you mean: cocaine, codeine?</li>
                      ) : this.state.loading ? (
                        <li className='item'>Loading...</li>
                      ) : items.length === 0 ? (
                        <li className='item'>No matches for {value}</li>
                      ) : items}
                    </ul>
                  )}
                  isItemSelectable={(item) => !item.header}
                />
                  <div className='input-group-append'>
                  <Button className='btn--primary icon-magnifying' id='search-button'><Svg url='/ui/svg/magnifying.svg' alt=''/></Button>
                </div>
              </div>
            </div>
          </Form>

          <Grid>
            <GridCol className='col-12 col-sm-8'>
              <ul className='list-unstyled' role='list'>
                {this.props.list.map((val, i) => {
                  return (
                    <li id={val.group} key={'outer' + i}>
                      <Heading text={val.group} modifiers='display-2 underlined underlined--offscreen'/>
                      <ul className='list-unstyled'>
                      {val.values.map((v, index) => {
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
}
