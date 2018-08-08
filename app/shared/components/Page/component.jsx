import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Longform from '../Longform/component.jsx'
import Grid from '../Grid/component.jsx'
import GridCol from '../GridCol/component.jsx'
import Toggle from '../Toggle/component.jsx'
import Heading from '../Heading/component.jsx'
import Svg from '../Svg/component.jsx'

const Page = props => {
  const modifiers = {
    type: 'p',
    modifiers: 'h6'
  }

  return (
    <div className='main-wrapper'>
      <Masthead />
      <h1>{props.name}</h1>
      <Grid>
        <GridCol className='col-12 col-sm-8'>
          <p className='lead'>{props.synonyms}</p>
          <Longform text={props.description} />
          <section className='section'>
/* eslint-disable no-irregular-whitespace */
            <Svg url='/ui/svg/eye.svg' className='ml-5 mb-5 float-right'/>
            <Heading modifiers='h3' text={`How do you tell if something  is ${props.name}?`}/>
            <p className='muted'>Read about what {props.name} looks, smells and tastes like</p>
/* eslint-enable no-irregular-whitespace */
            <Toggle text={`How to recognise ${props.name}`} className='collapsible--chevron' hidden='true'>
              {props.appearance_whatDoesItLookLike && <React.Fragment><Heading {...modifiers} text={'What does it look like?'}/>
                <Longform text={props.appearance_whatDoesItLookLike}/></React.Fragment>
              }
              {props.appearance_whatDoesItTastesmellLike && <React.Fragment><Heading {...modifiers} text={'What does it taste/smell like?'}/>
                <Longform text={props.appearance_whatDoesItTastesmellLike}/></React.Fragment>
              }
            </Toggle>
          </section>
          <section className='section'>
            <Svg url='/ui/svg/take.svg' className='ml-5 mb-5 float-right'/>
            <Heading modifiers='h3' text={`How do people take ${props.name}?`}/>
            <p className='muted'>Read about the different ways that {props.name} can be taken</p>
            <Toggle text='How to recognise {props.name}' className='collapsible--chevron' hidden='true'>
            {props.appearance_howDoPeopleTakeIt && <React.Fragment><Heading {...modifiers} text={'How do people take it?'}/><Longform text={props.appearance_howDoPeopleTakeIt} /></React.Fragment>
            }
            </Toggle>
          </section>
          <section className='section'>
            <Svg url='/ui/svg/effects.svg' className='ml-5 mb-5 float-right'/>
            <Heading modifiers='h3' text={`What are the effects of taking ${props.name}?`}/>
            <p className='muted'>Read about the effects that {props.name} has on your body and mind.</p>
            <Toggle text='How to recognise cocaine' className='collapsible--chevron' hidden='true'>
              {props.effects_howDoesItMakeYouFeel && <React.Fragment><Heading {...modifiers} text={'How does it make you feel?'}/><Longform text={props.effects_howDoesItMakeYouFeel} /></React.Fragment>
              }
              {props.effects_howDoesItMakePeopleBehave && <React.Fragment><Heading {...modifiers} text={'How does it make people behave?'}/><Longform text={props.effects_howDoesItMakePeopleBehave} /></React.Fragment>
              }
              {props.effects_whatAreThePhysicalEffects && <React.Fragment><Heading {...modifiers} text={'What are the physical effects?'}/><Longform text={props.effects_whatAreThePhysicalEffects} /></React.Fragment>
              }
              {props.effects_whatIsTheComedownLike && <React.Fragment><Heading {...modifiers} text={'What is the comedown like?'}/><Longform text={props.effects_whatIsTheComedownLike} /></React.Fragment>
              }
              {props.effects_howLongDoesItStayInYourBody && <React.Fragment><Heading {...modifiers} text={'How long does it stay in your body?'}/><Longform text={props.effects_howLongDoesItStayInYourBody} /></React.Fragment>
              }
            </Toggle>
          </section>
          <section className='section'>
            <Svg url='/ui/svg/risks.svg' className='ml-5 mb-5 float-right'/>
            <Heading modifiers='h3' text={`What are the risks of taking ${props.name}?`}/>
            <p className='muted'>Read about addiction, the risks of mixing {props.name} with other drugs and the risks to your health.</p>
            <Toggle text={`How to recognise ${props.name}`} className='collapsible--chevron' hidden='true'>
              {props.risks_whatAreTheRisks && <React.Fragment><Heading {...modifiers} text={'What are the risks?'}/><Longform text={props.risks_whatAreTheRisks} /></React.Fragment>
              }
              {props.risks_canYouGetAddicted && <React.Fragment><Heading {...modifiers} text={'Can you get addicted?'}/><Longform text={props.risks_canYouGetAddicted} /></React.Fragment>
              }
              {props.risks_isItDangerousToMixWithOtherDrugs && <React.Fragment><Heading {...modifiers} text={'Is it dangerous to mix with other drugs?'}/><Longform text={props.risks_isItDangerousToMixWithOtherDrugs} /></React.Fragment>
              }
              {props.risks_whatIsCutWith && <React.Fragment><Heading {...modifiers} text={'What is cut with?'}/><Longform text={props.risks_whatIsCutWith} /></React.Fragment>
              }
              {props.effects_howDoesItEffectSocietyAndTheEnvironment && <React.Fragment><Heading {...modifiers} text={'How does it effect society and the environment'}/><Longform text={props.effects_howDoesItEffectSocietyAndTheEnvironment} /></React.Fragment>
              }
            </Toggle>
          </section>
          <section className='section'>
            <Svg url='/ui/svg/law.svg' className='ml-5 mb-5 float-right'/>
            <Heading modifiers='h3' text={`What does the law say about ${props.name}?`}/>
            <p className='muted'>Read more about {props.name} being a Class A drug.</p>
            <Toggle text={'How to recognise cocaine'} className='collapsible--chevron' hidden='true'>
              {props.law_whatIsTheDrugClassification && <React.Fragment><Heading {...modifiers} text={'What is the drug classification?'}/><Longform text={props.law_whatIsTheDrugClassification} /></React.Fragment>
              }
              {props.law_whatIfYouAreCaughtWithIt && <React.Fragment><Heading {...modifiers} text={'What if you are caught with it?'}/><Longform text={props.law_whatIfYouAreCaughtWithIt} /></React.Fragment>
              }
            </Toggle>
          </section>
          <section className='section'>
            <Heading modifiers='h3' text={`Worried about your  ${props.name} use?`}/>
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
  )
}

export default Page
