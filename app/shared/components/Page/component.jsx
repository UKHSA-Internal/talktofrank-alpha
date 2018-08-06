import React from 'react'
import Masthead from '../Masthead/component.jsx'
import Longform from '../Longform/component.jsx'

const Page = props => {
  return (
    <div className='main-wrapper'>
      <Masthead />
      <h1>{props.name}</h1>
      <p className='lead'>{props.synonyms}</p>
      <Longform text={props.description} />
      {props.appearance_whatDoesItLookLike &&
        <Longform text={props.appearance_whatDoesItLookLike} />
      }
      {props.appearance_whatDoesItTastesmellLike &&
        <Longform text={props.appearance_whatDoesItTastesmellLike} />
      }
      {props.appearance_howDoPeopleTakeIt &&
        <Longform text={props.appearance_howDoPeopleTakeIt} />
      }
      {props.effects_howDoesItMakeYouFeel &&
        <Longform text={props.effects_howDoesItMakeYouFeel} />
      }
      {props.effects_howDoesItMakePeopleBehave &&
        <Longform text={props.effects_howDoesItMakePeopleBehave} />
      }
      {props.effects_whatAreThePhysicalEffects &&
        <Longform text={props.effects_whatAreThePhysicalEffects} />
      }
      {props.effects_whatIsTheComedownLike &&
        <Longform text={props.effects_whatIsTheComedownLike} />
      }
      {props.effects_howLongDoesItStayInYourBody &&
        <Longform text={props.effects_howLongDoesItStayInYourBody} />
      }
      {props.risks_whatAreTheRisks &&
        <Longform text={props.risks_whatAreTheRisks} />
      }
      {props.risks_canYouGetAddicted &&
        <Longform text={props.risks_canYouGetAddicted} />
      }
      {props.risks_isItDangerousToMixWithOtherDrugs &&
        <Longform text={props.risks_isItDangerousToMixWithOtherDrugs} />
      }
      {props.risks_whatIsCutWith &&
        <Longform text={props.risks_whatIsCutWith} />
      }
      {props.effects_howDoesItEffectSocietyAndTheEnvironment &&
        <Longform text={props.effects_howDoesItEffectSocietyAndTheEnvironment} />
      }
      {props.law_whatIsTheDrugClassification &&
        <Longform text={props.law_whatIsTheDrugClassification} />
      }
      {props.law_whatIfYouAreCaughtWithIt &&
        <Longform text={props.law_whatIfYouAreCaughtWithIt} />
      }
      {props.worried_iFeelPressuredIntoTakingItWhatCanIDo &&
        <Longform text={props.worried_iFeelPressuredIntoTakingItWhatCanIDo} />
      }
      {props.worried_howCanIHelpMyFriendWithTheirUse &&
        <Longform text={props.worried_howCanIHelpMyFriendWithTheirUse} />
      }
      {props.worried_iveSpentAllMyMoneyOnItWhatCanIDo &&
        <Longform text={props.worried_iveSpentAllMyMoneyOnItWhatCanIDo} />
      }
    </div>
  )
}

export default Page
