import React from 'react'

const Typography = props => {
  return (
    <main className='container container-fluid'>

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
      <p className='h4'>...which is a chunk of h4 sized paragraph text - super</p>

      <hr className='divider mt-5 mb-5'/>

      <h5>This is an actual h5 - time to test it out in the format below....</h5>
      <p className='h5'>...which is a chunk of h5 sized paragraph text - super</p>

      <hr className='divider mt-5 mb-5'/>

      <h6>This is an actual h6 - time to test it out in the format below....</h6>
      <p className='h6'>...which is a chunk of h6 sized paragraph text - super</p>

      <hr className='divider mt-5 mb-5'/>
      <ul>
        <li>Something</li>
        <li>Something</li>
        <li>Something</li>
        <li>Something</li>
        <li>Something</li>
      </ul>

      <hr className='divider mt-5 mb-5'/>

      <ul className="breadcrumb">
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
