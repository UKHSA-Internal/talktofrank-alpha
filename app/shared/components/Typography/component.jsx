import React from 'react'

const Typography = props => {
  return (
    <main className='container container-fluid'>
      <h1 className='display-2'>BIG text - heading</h1>
      <p className='display-2'>BIG text - non-heading</p>
      <h1>This is a chunk of h1</h1>
      <p className='h1'>This is a chunk of h1 sized paragraph text that is being churned out</p>

      <hr className='divider mt-5 mb-5'/>
      <h2>This is an actual h2</h2>
      <p className='h2'>This is a chunk of h2 paragraph text - indistinguishable except perhaps the bottom margin</p>
      <hr className='divider mt-5 mb-5'/>
      <h3>This is an actual h3</h3>
      <p className='h3'>This is a chunk of h3 paragraph text - indistinguishable except perhaps the bottom margin</p>
      <hr className='divider mt-5 mb-5'/>
      <h4>This is an actual h4 - time to test it out in the format below....</h4>
      <p className='h4'>...which is a chunk of h4</p>
      <hr className='divider mt-5 mb-5'/>
      <h5>This is an actual h5 - time to test it out in the format below....</h5>
      <p className='h5'>...which is a chunk of h5</p>
      <hr className='divider mt-5 mb-5'/>

      <div className='long-form'><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></div>

      <hr className='divider mt-5 mb-5'/>
      <ul className="nav breadcrumb">
        <li className='breadcrumb__item'>
          <a href='#' className='breadcrumb__link'>Amount</a>
        </li>
        <li className='breadcrumb__item'>
          <a href='#' className='breadcrumb__link'>Billing</a>
        </li>
        <li className='breadcrumb__item'>
          <a href='#' className='breadcrumb__link'>Contact</a>
        </li>
        <li className='breadcrumb__item'>
          <a href='#' className='breadcrumb__link'>Confirm</a>
        </li>
      </ul>
    </main>
  )
}

export default Typography
