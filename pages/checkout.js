import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import InputField from '../components/InputField/InputField'

export default function Options() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  
  const handleChangeFirst = event => {
    setFirstName(event.target.value)
  }

  const handleChangeLast = event => {
    setLastName(event.target.value)
  }

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>

      <div id='cart-summary' className='p-2 bg-white rounded-lg'>
        <div className='flex items-center justify-center'>
          <img className='inline-block object-cover w-1/6' src='https://wkruk.pl/product_picture/square_1024/55a0661afdb58cf2a4076feb7e4b09e3.png' />

          <span className='w-1/3 text-center'>Omega</span>

          <span className='w-1/3 text-center right-4'>$396</span>
        </div>

        <div className='pt-4 text-center'>

          <p className='p1'>Payment method: <span>Card</span></p>
          <p className='p1'>Shipping cost: <span>$10</span></p>
          <p className='font-bold p1'>Total: <span>$395</span></p>
        </div>
      </div>

      <form className='p-4'>
        <div id='delivery-opitons' className='flex flex-col items-center justify-center py-4'>
          <h2 className='text-2xl text-center'>Shipping options</h2>
              
          <input className='hidden fill-label' type='radio' name='shipping' id='dhl'/>
          <label htmlFor='dhl' className='block w-4/6 p-2 my-2 text-center bg-white border rounded-lg border-primary '>DHL $10</label>

          <input className='hidden fill-label' type='radio' name='shipping' id='gls'/>
          <label htmlFor='gls' className='block w-4/6 p-2 my-2 text-center bg-white border rounded-lg border-primary'>GLS $11</label>

          <input className='hidden fill-label' type='radio' name='shipping' id='dpd'/>
          <label htmlFor='dpd' className='block w-4/6 p-2 my-2 text-center bg-white border rounded-lg border-primary'>DPD $12</label>

        </div>

        <div id='payment-methods' className='flex flex-col items-center justify-center py-4'>

          <h2 className='text-2xl text-center'>Payment methods</h2>

          <input className='hidden fill-label' type='radio' name='payment' id='card'/>
          <label htmlFor='card' className='block w-4/6 p-2 my-2 text-center bg-white border rounded-lg border-primary'>Card</label>

          <input className='hidden fill-label' type='radio' name='payment' id='bank-transfer'   />
          <label htmlFor='bank-transfer' className='block w-4/6 p-2 my-2 text-center bg-white border rounded-lg border-primary'>Bank Transfer</label>

          <input className='hidden fill-label' type='radio' name='payment' id='paypal'  />
          <label htmlFor='paypal' className='block w-4/6 p-2 my-2 text-center bg-white border rounded-lg border-primary'>PayPal</label>

        </div>

        <div id='address' className='flex flex-col items-center justify-center py-4'>

          <div className='w-4/6'>
            <h2 className='w-full text-2xl'>Address</h2>
          </div>


          <InputField 
            name='firstName'
            type='text'
            labelText='First Name' 
            value={firstName}
            handleChange={handleChangeFirst}
          />

          <InputField 
            name='lastName'
            type='text'
            labelText='Last Name' 
            value={lastName}
            handleChange={handleChangeLast}
          />

        </div>



        <div className='flex items-center justify-center w-full my-2 rounded-t-lg '>
          <Link href='/checkout/address'>
            <a className='px-20 py-4 text-lg text-white rounded-full shadow-lg bg-primary focus:outline-none'>
                Go to payment
            </a>
          </Link>
        </div>
      </form>
    </>
  )
}