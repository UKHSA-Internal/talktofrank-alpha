import React from 'react'
import Button from '../Button/component.jsx'
import ButtonGroup from '../ButtonGroup/component.jsx'
import SplitText from '../SplitText/component.jsx'



const Typography = props => {
  return (
    <main className='container container-fluid spacing-bottom--large'>
      <p className='display-2'>BIG text - non-heading</p>
      <h1>This is a chunk of h1</h1>
      <p className='h1 heading-inverted-test constrained-text--wide'><span>Honest</span> <span>informagtion</span> <span>about</span> <span className='highlighted'>dhugs</span></p>

      <SplitText text='This is a promo banner space that can be turned on and off' modifiers='heading-inverted-test constrained-text' highlight={[2,5,6]}/>

      <p className='h3 inverted'>This is a chunk of h3 paragraph text - indistinguishable except perhaps the bottom margin</p>
      <hr className='divider mt-5 mb-5'/>
      <h2>This is an actual h2</h2>
      <p className='h2'>This is a chunk of h2  text - indistinguishable except perhaps the bottom margin</p>
      <hr className='divider mt-5 mb-5'/>
      <h3>This is an actual h3</h3>
      <hr className='divider mt-5 mb-5'/>
      <h4>This is an actual h4 - time to test it out in the format below....</h4>
      <p className='h4'>...which is a chunk of h4</p>
      <hr className='divider mt-5 mb-5'/>
      <p className='h3'>This is a chunk of h3  text - but applied to </p>
      <hr className='divider mt-5 mb-5'/>
      <div className='long-form'><small>A section of small text. Infrequently used - perhaps for captions only?</small></div>
      <hr className='divider mt-5 mb-5'/>
      <div className='long-form'><p className='lead'>Lead text - used to introduce a section of long-form content</p></div>
      <hr className='divider mt-5 mb-5'/>
      <div className='long-form'><h3>This is standard body copy</h3><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></div>
      <hr className='divider mt-5 mb-5'/>

      <h3 className='spacing-bottom--single'>The following are calls-to-action</h3>
      <ButtonGroup>
        <Button className='btn--link'>Read more about this thing</Button>
        <Button className='btn--primary has-arrow'>Watch this thing now</Button>
        <Button className='btn--primary'>Button without arrow!</Button>
      </ButtonGroup>
    </main>
  )
}

export default Typography
