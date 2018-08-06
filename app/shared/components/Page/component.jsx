import React from 'react'
import Masthead from '../Masthead/component.jsx'

const Page = props => {

  console.log(props)

  return (
    <React.Fragment>
      <Masthead />
      {props.components}{props.children}
      <h1>{props.name}</h1>
      <h5>{props.synonyms}</h5>
      <div dangerouslySetInnerHTML={{__html: props.description}} />
      {props.appearance_whatDoesItLookLike &&
        <div dangerouslySetInnerHTML={{__html: props.appearance_whatDoesItLookLike}} />
      }
      {props.appearance_whatDoesItTastesmellLike &&
        <div dangerouslySetInnerHTML={{__html: props.appearance_whatDoesItTastesmellLike}} />
      }
      {props.appearance_howDoPeopleTakeIt &&
        <div dangerouslySetInnerHTML={{__html: props.appearance_howDoPeopleTakeIt}} />
      }
      {props.effects_howDoesItMakeYouFeel &&
        <div dangerouslySetInnerHTML={{__html: props.effects_howDoesItMakeYouFeel}} />
      }
      {props.effects_howDoesItMakePeopleBehave &&
        <div dangerouslySetInnerHTML={{__html: props.effects_howDoesItMakePeopleBehave}} />
      }
      {props.effects_whatAreThePhysicalEffects &&
        <div dangerouslySetInnerHTML={{__html: props.effects_whatAreThePhysicalEffects}} />
      }
      {props.effects_whatIsTheComedownLike &&
        <div dangerouslySetInnerHTML={{__html: props.effects_whatIsTheComedownLike}} />
      }
      {props.effects_howLongDoesItStayInYourBody &&
        <div dangerouslySetInnerHTML={{__html: props.effects_howLongDoesItStayInYourBody}} />
      }
      {props.risks_whatAreTheRisks &&
        <div dangerouslySetInnerHTML={{__html: props.risks_whatAreTheRisks}} />
      }
      {props.risks_canYouGetAddicted &&
        <div dangerouslySetInnerHTML={{__html: props.risks_canYouGetAddicted}} />
      }
      {props.risks_isItDangerousToMixWithOtherDrugs &&
        <div dangerouslySetInnerHTML={{__html: props.risks_isItDangerousToMixWithOtherDrugs}} />
      }
      {props.risks_whatIsCutWith &&
        <div dangerouslySetInnerHTML={{__html: props.risks_whatIsCutWith}} />
      }
      {props.effects_howDoesItEffectSocietyAndTheEnvironment &&
        <div dangerouslySetInnerHTML={{__html: props.effects_howDoesItEffectSocietyAndTheEnvironment}} />
      }
      {props.law_whatIsTheDrugClassification &&
        <div dangerouslySetInnerHTML={{__html: props.law_whatIsTheDrugClassification}} />
      }
      {props.law_whatIfYouAreCaughtWithIt &&
        <div dangerouslySetInnerHTML={{__html: props.law_whatIfYouAreCaughtWithIt}} />
      }
      {props.worried_iFeelPressuredIntoTakingItWhatCanIDo &&
        <div dangerouslySetInnerHTML={{__html: props.worried_iFeelPressuredIntoTakingItWhatCanIDo}} />
      }
      {props.worried_howCanIHelpMyFriendWithTheirUse &&
        <div dangerouslySetInnerHTML={{__html: props.worried_howCanIHelpMyFriendWithTheirUse}} />
      }
      {props.worried_iveSpentAllMyMoneyOnItWhatCanIDo &&
        <div dangerouslySetInnerHTML={{__html: props.worried_iveSpentAllMyMoneyOnItWhatCanIDo}} />
      }
    </React.Fragment>
  )
}

export default Page
