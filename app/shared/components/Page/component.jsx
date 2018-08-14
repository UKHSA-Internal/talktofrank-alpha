import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Longform from '../Longform/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Toggle from '../Toggle/component.jsx'
import Heading from '../Heading/component.jsx'
import Svg from '../Svg/component.jsx'
import Footer from '../Footer/component.jsx'
import Main from '../Main/component.jsx'

export default class Page extends React.PureComponent {
  constructor (props) {
    super(props)

  }

  onhashchange () {
    // var tab = cache[location.hash]

    // if (tab) {
    //   if (last) {
    //     console.log(last)
    //   }

    //   last = tab
    // }

    // else if (!tab) {
    //   if (last) {
    //     console.log(last)
    //   }
    // }
  }

  componentDidMount() {
    console.log('component mounted')
    window.addEventListener('hashchange', this.onhashchange)
  }

  componentWillUnmount() {
    console.log('component mounted')
    window.removeEventListener('hashchange', this.onhashchange)
  }

  render () {
    const modifiers = {
      type: 'p',
      modifiers: 'h6'
    }
    const name = this.props.name.toLowerCase()

    return (
      <React.Fragment>
        <Masthead />
        <Main>
          <h1>{this.props.name}</h1>
          <p className='lead muted'>{this.props.synonyms}</p>
          <Longform text={this.props.description} className='spacing-bottom--large'/>
          <Grid>
            <GridCol className='col-12 col-sm-8'>
              <section className='section section--has-toggle'>
                <Heading modifiers='h3 spacing--single sm-spacing--tight'
                  // eslint-disable-next-line no-irregular-whitespace
                  text={`How it looks, tastes and smells`}/>
                <Toggle text={`How to recognise ${name}`} className='collapsible--chevron' hidden='true'>
                  {this.props.appearance_whatDoesItLookLike && <React.Fragment><Heading {...modifiers} text={`What does ${name} look like?`}/>
                    <Longform text={this.props.appearance_whatDoesItLookLike}/></React.Fragment>
                  }
                  {this.props.risks_whatIsCutWith && <React.Fragment><Heading {...modifiers} text={`What is ${name} cut with?`}/><Longform text={this.props.risks_whatIsCutWith} /></React.Fragment>
                  }
                  {this.props.appearance_whatDoesItTastesmellLike && <React.Fragment><Heading {...modifiers} text={`What does ${name} taste/smell like?`}/>
                    <Longform text={this.props.appearance_whatDoesItTastesmellLike}/></React.Fragment>
                  }
                  {this.props.appearance_howDoPeopleTakeIt && <React.Fragment><Heading {...modifiers} text={`How do people take ${name}?`}/><Longform text={this.props.appearance_howDoPeopleTakeIt} /></React.Fragment>
                  }
                </Toggle>
              </section>
              <section className='section section--has-toggle'>
                <Heading modifiers='h3 spacing--single sm-spacing--tight' text={`How it feels`}/>
                <Toggle text={`How does ${name} feel`} className='collapsible--chevron' hidden='true'>
                  {this.props.effects_howDoesItMakeYouFeel && <React.Fragment><Heading {...modifiers} text={`How does ${name} make you feel?`}/><Longform text={this.props.effects_howDoesItMakeYouFeel} /></React.Fragment>
                  }
                   {this.props.effects_whatAreThePhysicalEffects && <React.Fragment><Heading {...modifiers} text={`What are the physical effects of ${name}?`}/><Longform text={this.props.effects_whatAreThePhysicalEffects} /></React.Fragment>
                  }
                  {this.props.effects_howDoesItMakePeopleBehave && <React.Fragment><Heading {...modifiers} text={`How does ${name} make people behave?`}/><Longform text={this.props.effects_howDoesItMakePeopleBehave} /></React.Fragment>
                  }
                </Toggle>
              </section>

              <section className='section section--has-toggle'>
                <Heading modifiers='h3 spacing--single sm-spacing--tight' text='Duration'/>
                <Toggle text={`Duration of ${name}`} className='collapsible--chevron' hidden='true'>
                  {this.props.effects_howLongDoesItStayInYourBody && <React.Fragment><Heading {...modifiers} text={`How long does ${name} stay in your body?`}/><Longform text={this.props.effects_howLongDoesItStayInYourBody} /></React.Fragment>
                  }
                  {this.props.effects_whatIsTheComedownLike && <React.Fragment><Heading {...modifiers} text={`What is the comedown off ${name} like?`}/><Longform text={this.props.effects_whatIsTheComedownLike} /></React.Fragment>
                  }
                </Toggle>
              </section>
              <section className='section section--has-toggle'>
                <Heading modifiers='h3 spacing--single sm-spacing--tight' text={`The risks`}/>
                <Toggle text={`Risks of ${name}`} className='collapsible--chevron' hidden='true'>
                  {this.props.risks_whatAreTheRisks && <React.Fragment><Heading {...modifiers} text={`What are the risks of ${name}?`}/><Longform text={this.props.risks_whatAreTheRisks} /></React.Fragment>
                  }
                  {this.props.effects_howDoesItEffectSocietyAndTheEnvironment && <React.Fragment><Heading {...modifiers} text={`How does ${name} effect society and the environment`}/><Longform text={this.props.effects_howDoesItEffectSocietyAndTheEnvironment} /></React.Fragment>
                  }
                </Toggle>
              </section>
              <section className='section section--has-toggle'>
                <Heading modifiers='h3 spacing--single sm-spacing--tight' text='Mixing'/>
                <Toggle text={`Risks of mixing with ${name}`} className='collapsible--chevron' hidden='true'>
                  {this.props.risks_isItDangerousToMixWithOtherDrugs && <React.Fragment><Heading {...modifiers} text={`Is ${name} dangerous to mix with other drugs?`}/><Longform text={this.props.risks_isItDangerousToMixWithOtherDrugs} /></React.Fragment>
                  }
                </Toggle>
              </section>
              <section className='section section--has-toggle'>
                <Heading modifiers='h3 spacing--single sm-spacing--tight' text='Addiction'/>
                <Toggle text={`Addiction risks of ${name}`} className='collapsible--chevron' hidden='true'>
                  {this.props.risks_canYouGetAddicted && <React.Fragment><Heading {...modifiers} text={`Can you get addicted to ${name}?`}/><Longform text={this.props.risks_canYouGetAddicted} /></React.Fragment>
                  }
                </Toggle>
              </section>
              <section className='section section--has-toggle'>
                <Heading modifiers='h3 spacing--single sm-spacing--tight' text={`The law`}/>
                <Toggle text={'How to recognise cocaine'} className='collapsible--chevron' hidden='true'>
                  {this.props.law_whatIsTheDrugClassification && <React.Fragment><Heading {...modifiers} text={`What is the drug classification of ${name}?`}/><Longform text={this.props.law_whatIsTheDrugClassification} /></React.Fragment>
                  }
                  {this.props.law_whatIfYouAreCaughtWithIt && <React.Fragment><Heading {...modifiers} text={`What if you are caught with ${name}?`}/><Longform text={this.props.law_whatIfYouAreCaughtWithIt} /></React.Fragment>
                  }
                </Toggle>
              </section>
              <section className='section section--has-toggle'>
                <Heading modifiers='h3 spacing--single sm-spacing--tight' text={`Worried about ${name} use?`}/>
                <p className='muted'>If you are worried about your {this.props.name} use, you can call FRANK on <a href='tel:0800776600'>0800 77 66 00</a> for friendly, confidential advice.</p>
                <Toggle text={'How to recognise cocaine'} className='collapsible--chevron' hidden='true'>
                  {this.props.worried_iFeelPressuredIntoTakingItWhatCanIDo && <React.Fragment><Heading {...modifiers} text={'I feel pressured into taking it, what can I do?'}/><Longform text={this.props.worried_iFeelPressuredIntoTakingItWhatCanIDo} /></React.Fragment>
                  }
                  {this.props.worried_howCanIHelpMyFriendWithTheirUse && <React.Fragment><Heading {...modifiers} text={'How can I help my friend with their use?'}/><Longform text={this.props.worried_howCanIHelpMyFriendWithTheirUse} /></React.Fragment>
                  }
                  {this.props.worried_iveSpentAllMyMoneyOnItWhatCanIDo && <React.Fragment><Heading {...modifiers} text={'I`ve spent all my money on it, what can I do'}/><Longform text={this.props.worried_iveSpentAllMyMoneyOnItWhatCanIDo} /></React.Fragment>
                  }
                </Toggle>
              </section>
            </GridCol>
          </Grid>
        </Main>
        <Footer />
      </React.Fragment>
    )
  }
}
