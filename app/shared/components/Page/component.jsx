import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Longform from '../Longform/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Toggle from '../Toggle/component.jsx'
import Heading from '../Heading/component.jsx'
import Svg from '../Svg/component.jsx'
import Footer from '../Footer/component.jsx'

const Page = props => {
  const modifiers = {
    type: 'p',
    modifiers: 'h6'
  }

  return (
    <React.Fragment>
      <Masthead />
      <div className='main-wrapper'>
        <h1>{props.name}</h1>
        <Grid>
          <GridCol className='col-12 col-sm-8'>
            <p className='lead muted'>{props.synonyms}</p>
            <Longform text={props.description} className='spacing-bottom--large'/>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/eye.svg' className='ml-5 mt-3 mb-5 mr-3 float-right'/>
              <Heading modifiers='h3'
                // eslint-disable-next-line no-irregular-whitespace
                text={`How it looks, tastes and smells`}/>

              <Toggle text={`How to recognise ${props.name}`} className='collapsible--chevron' hidden='true'>
                {props.appearance_whatDoesItLookLike && <React.Fragment><Heading {...modifiers} text={`What does ${props.name} look like?`}/>
                  <Longform text={props.appearance_whatDoesItLookLike}/></React.Fragment>
                }
                {props.appearance_whatDoesItTastesmellLike && <React.Fragment><Heading {...modifiers} text={`What does ${props.name} taste/smell like?`}/>
                  <Longform text={props.appearance_whatDoesItTastesmellLike}/></React.Fragment>
                }

                {props.appearance_howDoPeopleTakeIt && <React.Fragment><Heading {...modifiers} text={`How do people take ${props.name}?`}/><Longform text={props.appearance_howDoPeopleTakeIt} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/effects.svg' className='ml-5 mt-3 mr-3 mr-5 mb-5 float-right'/>
              <Heading modifiers='h3' text={`The effects`}/>
              <Toggle text='How to recognise cocaine' className='collapsible--chevron' hidden='true'>
                {props.effects_howDoesItMakeYouFeel && <React.Fragment><Heading {...modifiers} text={`How does ${props.name} make you feel?`}/><Longform text={props.effects_howDoesItMakeYouFeel} /></React.Fragment>
                }
                {props.effects_howDoesItMakePeopleBehave && <React.Fragment><Heading {...modifiers} text={`How does ${props.name} make people behave?`}/><Longform text={props.effects_howDoesItMakePeopleBehave} /></React.Fragment>
                }
                {/* {props.effects_whatAreThePhysicalEffects && <React.Fragment><Heading {...modifiers} text={`What are the physical effects of ${props.name}?`}/><Longform text={props.effects_whatAreThePhysicalEffects} /></React.Fragment>
                } */}
                {props.effects_whatIsTheComedownLike && <React.Fragment><Heading {...modifiers} text={`What is the comedown off ${props.name} like?`}/><Longform text={props.effects_whatIsTheComedownLike} /></React.Fragment>
                }
                {props.effects_howLongDoesItStayInYourBody && <React.Fragment><Heading {...modifiers} text={`How long does ${props.name} stay in your body?`}/><Longform text={props.effects_howLongDoesItStayInYourBody} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/risks.svg' className='ml-5 mt-3 mb-5 mr-3 float-right'/>
              <Heading modifiers='h3' text={`The risks`}/>
              <Toggle text={`How to recognise ${props.name}`} className='collapsible--chevron' hidden='true'>
                {props.risks_whatAreTheRisks && <React.Fragment><Heading {...modifiers} text={`What are the risks of ${props.name}?`}/><Longform text={props.risks_whatAreTheRisks} /></React.Fragment>
                }
                {props.risks_canYouGetAddicted && <React.Fragment><Heading {...modifiers} text={`Can you get addicted to ${props.name}?`}/><Longform text={props.risks_canYouGetAddicted} /></React.Fragment>
                }
                {props.risks_isItDangerousToMixWithOtherDrugs && <React.Fragment><Heading {...modifiers} text={`Is ${props.name} dangerous to mix with other drugs?`}/><Longform text={props.risks_isItDangerousToMixWithOtherDrugs} /></React.Fragment>
                }
                {props.risks_whatIsCutWith && <React.Fragment><Heading {...modifiers} text={`What is ${props.name} cut with?`}/><Longform text={props.risks_whatIsCutWith} /></React.Fragment>
                }
                {props.effects_howDoesItEffectSocietyAndTheEnvironment && <React.Fragment><Heading {...modifiers} text={`How does ${props.name} effect society and the environment`}/><Longform text={props.effects_howDoesItEffectSocietyAndTheEnvironment} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/law.svg' className='ml-5 mt-3 mb-5 mr-3 float-right'/>
              <Heading modifiers='h3' text={`The law`}/>
              <Toggle text={'How to recognise cocaine'} className='collapsible--chevron' hidden='true'>
                {props.law_whatIsTheDrugClassification && <React.Fragment><Heading {...modifiers} text={`What is the drug classification of ${props.name}?`}/><Longform text={props.law_whatIsTheDrugClassification} /></React.Fragment>
                }
                {props.law_whatIfYouAreCaughtWithIt && <React.Fragment><Heading {...modifiers} text={`What if you are caught with ${props.name}?`}/><Longform text={props.law_whatIfYouAreCaughtWithIt} /></React.Fragment>
                }
              </Toggle>
            </section>
            <section className='section section--has-toggle'>
              <Svg url='/ui/svg/worried.svg' className='ml-5 mb-5 mt-5 mr-5 float-right'/>
              <Heading modifiers='h3' text={`Worried about ${props.name} use?`}/>
              <p className='muted'>If you are worried about your {props.name} use, you can call FRANK on <a href='tel:0800776600'>0800 77 66 00</a> for friendly, confidential advice.</p>
              <Toggle text={'How to recognise cocaine'} className='collapsible--chevron' hidden='true'>
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
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Page
