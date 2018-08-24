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

const Page = props => {
  const modifiers = {
    type: 'p',
    modifiers: 'h6'
  }
  const name = props.name && props.name.toLowerCase()

  return (
    <React.Fragment>
      <Masthead />
      <Main>
        <h1>{props.name}</h1>
        <p className='lead muted'>{props.synonyms}</p>
        <Longform text={props.description} className='spacing-bottom--large'/>
        <Grid>
          <GridCol className='col-12 col-sm-8'>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/looks.svg' className='float-right spacing--tight' />
              <Heading modifiers='h3 spacing--single sm-spacing--tight' text={`How it looks, tastes and smells`}/>
              <Toggle text={`How to recognise ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.appearance_whatDoesItLookLike && <React.Fragment><Heading {...modifiers} text={`What does ${name} look like?`}/>
                  <Longform text={props.appearance_whatDoesItLookLike}/></React.Fragment>
                }
                {props.risks_whatIsCutWith && <React.Fragment><Heading {...modifiers} text={`What is ${name} cut with?`}/><Longform text={props.risks_whatIsCutWith} /></React.Fragment>
                }
                {props.appearance_whatDoesItTastesmellLike && <React.Fragment><Heading {...modifiers} text={`What does ${name} taste/smell like?`}/>
                  <Longform text={props.appearance_whatDoesItTastesmellLike}/></React.Fragment>
                }
                {props.appearance_howDoPeopleTakeIt && <React.Fragment><Heading {...modifiers} text={`How do people take ${name}?`}/><Longform text={props.appearance_howDoPeopleTakeIt} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/feels.svg' className='float-right spacing--tight' />
              <Heading modifiers='h3 spacing--single sm-spacing--tight' text={`How it feels`}/>
              <Toggle text={`How does ${name} feel`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.effects_howDoesItMakeYouFeel && <React.Fragment><Heading {...modifiers} text={`How does ${name} make you feel?`}/><Longform text={props.effects_howDoesItMakeYouFeel} /></React.Fragment>
                }
                 {props.effects_whatAreThePhysicalEffects && <React.Fragment><Heading {...modifiers} text={`What are the physical effects of ${name}?`}/><Longform text={props.effects_whatAreThePhysicalEffects} /></React.Fragment>
                }
                {props.effects_howDoesItMakePeopleBehave && <React.Fragment><Heading {...modifiers} text={`How does ${name} make people behave?`}/><Longform text={props.effects_howDoesItMakePeopleBehave} /></React.Fragment>
                }
              </Toggle>
            </section>

            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/duration.svg' className='float-right spacing--tight' />
              <Heading modifiers='h3 spacing--single sm-spacing--tight' text='Duration'/>
              <Toggle text={`Duration of ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.effects_howLongDoesItStayInYourBody && <React.Fragment><Heading {...modifiers} text={`How long does ${name} stay in your body?`}/><Longform text={props.effects_howLongDoesItStayInYourBody} /></React.Fragment>
                }
                {props.effects_whatIsTheComedownLike && <React.Fragment><Heading {...modifiers} text={`What is the comedown off ${name} like?`}/><Longform text={props.effects_whatIsTheComedownLike} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/risks.svg' className='float-right spacing--tight' />
              <Heading modifiers='h3 spacing--single sm-spacing--tight' text={`The risks`}/>
              <Toggle text={`Risks of ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.risks_whatAreTheRisks && <React.Fragment><Heading {...modifiers} text={`What are the risks of ${name}?`}/><Longform text={props.risks_whatAreTheRisks} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/mixing.svg' className='float-right spacing--tight' />
              <Heading modifiers='h3 spacing--single sm-spacing--tight' text='Mixing'/>
              <Toggle text={`Risks of mixing with ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.risks_isItDangerousToMixWithOtherDrugs && <React.Fragment><Heading {...modifiers} text={`Is ${name} dangerous to mix with other drugs?`}/><Longform text={props.risks_isItDangerousToMixWithOtherDrugs} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/addiction.svg' className='float-right spacing--tight' />
              <Heading modifiers='h3 spacing--single sm-spacing--tight' text='Addiction'/>
              <Toggle text={`Addiction risks of ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.risks_canYouGetAddicted && <React.Fragment><Heading {...modifiers} text={`Can you get addicted to ${name}?`}/><Longform text={props.risks_canYouGetAddicted} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/law.svg' className='float-right spacing--tight' />
              <Heading modifiers='h3 spacing--single sm-spacing--tight' text={`The law`}/>
              <Toggle text={`Legal status of ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.law_whatIsTheDrugClassification && <React.Fragment><Heading {...modifiers} text={`What is the drug classification of ${name}?`}/><Longform text={props.law_whatIsTheDrugClassification} /></React.Fragment>
                }
                {props.law_whatIfYouAreCaughtWithIt && <React.Fragment><Heading {...modifiers} text={`What if you are caught with ${name}?`}/><Longform text={props.law_whatIfYouAreCaughtWithIt} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/environment.svg' className='float-right spacing--tight' />
              <Heading modifiers='h3 spacing--single sm-spacing--tight' text='Environmental risks'/>
              <Toggle text={`Environmental risks of ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.effects_howDoesItEffectSocietyAndTheEnvironment && <React.Fragment><Heading {...modifiers} text={`How does ${name} effect the environment`}/><Longform text={props.effects_howDoesItEffectSocietyAndTheEnvironment} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/worried.svg' className='float-right spacing--tight' />
              <Heading modifiers='h3 spacing--single sm-spacing--tight' text={`Worried about ${name} use?`}/>
              <p className='muted'>If you are worried about your {props.name} use, you can call FRANK on <a href='tel:0800776600'>0800 77 66 00</a> for friendly, confidential advice.</p>
              <Toggle text={`Worried about ${name}`} className='collapsible--chevron' hidden='true' history={props.location}>
                {props.worried_iFeelPressuredIntoTakingItWhatCanIDo && <React.Fragment><Heading {...modifiers} text={'I feel pressured into taking it, what can I do?'}/><Longform text={props.worried_iFeelPressuredIntoTakingItWhatCanIDo} /></React.Fragment>
                }
                {props.worried_howCanIHelpMyFriendWithTheirUse && <React.Fragment><Heading {...modifiers} text={'How can I help my friend with their use?'}/><Longform text={props.worried_howCanIHelpMyFriendWithTheirUse} /></React.Fragment>
                }
                {props.worried_iveSpentAllMyMoneyOnItWhatCanIDo && <React.Fragment><Heading {...modifiers} text={'I`ve spent all my money on it, what can I do'}/><Longform text={props.worried_iveSpentAllMyMoneyOnItWhatCanIDo} /></React.Fragment>
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
export default Page
