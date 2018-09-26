import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Main from '../Main/component.jsx'
import Heading from '../Heading/component.jsx'
import FormGroupAutocomplete from '../FormGroupAutocomplete/component.jsx'
import Form from '../Form/component.jsx'
import Footer from '../Footer/component.jsx'
import CardDeck from '../CardDeck/component.jsx'
import LinkDeck from '../LinkDeck/component.jsx'
import GA from '../GoogleAnalytics/component.jsx'
import ReactGA from 'react-ga'
import Button from '../Button/component.jsx'

// @todo @refactor @joel - haul this out of here and into a fixture / Contentful
export default class PageHome extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    ReactGA.event({
      category: 'Navigation',
      action: 'Clicked Link',
      label: 'this is a label'
    })
  }

  componentDidMount () {
    ReactGA.timing({
      category: 'React libraries - client side',
      variable: 'load',
      value: 20, // in milliseconds
      label: 'React bundles'
    })
  }

  render () {
    const teasers = [{
      modifiers: '',
      url: '/',
      title: '5 tips for a safe festival experience',
      category: 'News',
      imageUrl: '/ui/img/content/news-1.jpg'
    },
    {
      modifiers: '',
      url: '/',
      title: 'The total truth about legal highs',
      category: 'News',
      imageUrl: '/ui/img/content/news-2.jpg'
    },
    {
      modifiers: '',
      url: '/',
      title: 'What are smart drugs and are they legal? ',
      category: 'News',
      imageUrl: '/ui/img/content/news-3.jpg'
    }]

    const cta = [{
      modifiers: '',
      url: '/',
      title: 'Help for you'
    },
    {
      modifiers: '',
      url: '/',
      title: 'Help for others'
    },
    {
      modifiers: '',
      url: '/drug',
      title: 'A-Z of drugs'
    }]

    return (
      <React.Fragment>
        <Masthead/>
        <Main className='homepage'>
          <section className='panel panel--padding-large has-bg bg-pills'>
            <Grid>
              <GridCol className='col-12 col-md-6'>
                <Heading text='Honest information about drugs' type='h1' modifiers='display-3 spacing-top--flush'/>
              </GridCol>
            </Grid>
          </section>
          <section className='panel panel--padding-large panel--pink'>
            <Form>
              <FormGroupAutocomplete
                button='true'
                modifiers='form-control--search'
                className='input-group-autocomplete--inverse'
                id='search-a-z'
                label='Search for any drug'
                showContent
                titleClass='h4'
                placeholder='Enter a drug name (e.g. Mandy, Cocaine, Weed)'
                resultsId='body-results'
              />
            </Form>
            <Button clickHandler={this.handleClick}>Click me to send an event</Button>
          </section>
          <Grid>
            <GridCol className='col-12'>
              <Heading text='News articles' className='sr-only'/>
              <CardDeck teasers={teasers} className='spacing--large card-deck--compact'/>
            </GridCol>
            <GridCol className='col-12'>
              <LinkDeck teasers={cta} className='spacing-bottom--large'/>
            </GridCol>
          </Grid>
        </Main>
        <Footer />
        <GA/>
      </React.Fragment>
    )
  }
}
