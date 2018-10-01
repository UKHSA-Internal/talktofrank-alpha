import React from 'react'

const SplitText = ({text, wrapper, modifiers = 'heading-inverted-test', highlight}) => {
  let str = text.split(' ')
  let Wrapper = `${wrapper || 'h2'}`
  str = str.map((item, i) => {
    let high = highlight.indexOf(i) !== -1 ? 'highlighted' : null
    return <span key={i} className={high}>{item} </span>
  })
  return <Wrapper className={modifiers}>{str}</Wrapper>
}
export default SplitText
