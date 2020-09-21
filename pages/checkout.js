import Head from 'next/head'
import Link from 'next/link'
import { useReducer } from 'react'

import Layout from '../components/layout'
import InputField from '../components/InputField'
import CartSummary from '../components/CartSummary'

const checkoutReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.field]: action.value
      }
    }

    case 'proceed': {
      return {
        ...state,
        isLoading: true,
        error: ''
      }
    }

    case 'success': {
      return {
        ...state,
        newPassword: '',
        newPasswordConfirm: '',
        currentPassword: '',
        isLoading: false
      }
    }

    case 'error': {
      return {
        ...state,
        error: 'Wrong password',
        isLoading: false
      }
    }

    default:
      break
  }
  return state
}

const initialState = {
  shipping: '',
  payment: '',
  firstName: '',
  lastName: '',
  zipCode: '',
  city: '',
  streetAndNumber: '',
  email: '',
  phoneNumber: '',
  isLoading: false,
  error: ''
}

export default function Options () {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)
  const { firstName, lastName, zipCode, city, streetAndNumber, email, phoneNumber } = state

  const handleChange = event => {
    dispatch({
      type: 'field',
      field: `${event.target.name}`,
      value: event.target.value
    })
  }

  return (
    <>
      <Layout>

        <Head>
          <title>Checkout</title>
        </Head>

        <CartSummary />

        <form className='p-4'>

          <div onChange={handleChange} name='shipping' className='flex flex-col items-center justify-center py-4'>
            <h2 className='text-2xl text-center'>Shipping options</h2>

            <input className='hidden fill-label' type='radio' name='shipping' value='dhl' id='dhl' />
            <label htmlFor='dhl' className='block w-4/6 p-2 my-2 text-center bg-white rounded-lg shadow'>DHL $10</label>

            <input className='hidden fill-label' type='radio' name='shipping' value='gls' id='gls' />
            <label htmlFor='gls' className='block w-4/6 p-2 my-2 text-center bg-white rounded-lg shadow'>GLS $11</label>

            <input className='hidden fill-label' type='radio' name='shipping' value='dpd' id='dpd' />
            <label htmlFor='dpd' className='block w-4/6 p-2 my-2 text-center bg-white rounded-lg shadow'>DPD $12</label>
          </div>

          <div onChange={handleChange} className='flex flex-col items-center justify-center py-4'>

            <h2 className='text-2xl text-center'>Payment methods</h2>

            <input className='hidden fill-label' type='radio' name='payment' id='card' value='card' />
            <label htmlFor='card' className='block w-4/6 p-2 my-2 text-center bg-white rounded-lg shadow'>Card</label>

            <input className='hidden fill-label' type='radio' name='payment' id='bankTransfer' value='bankTransfer' />
            <label htmlFor='bankTransfer' className='block w-4/6 p-2 my-2 text-center bg-white rounded-lg shadow'>Bank Transfer</label>

            <input className='hidden fill-label' type='radio' name='payment' id='paypal' value='paypal' />
            <label htmlFor='paypal' className='block w-4/6 p-2 my-2 text-center bg-white rounded-lg shadow'>PayPal</label>

          </div>

          <div className='flex flex-col items-center justify-center py-4'>

            <div className='w-4/6'>
              <h2 className='w-full text-2xl'>Address</h2>
            </div>

            <InputField
              name='firstName'
              type='text'
              labelText='First name'
              value={firstName}
              handleChange={handleChange}
            />

            <InputField
              name='lastName'
              type='text'
              labelText='Last name'
              value={lastName}
              handleChange={handleChange}
            />

            {/* Make proper validation in the future */}
            <InputField
              name='zipCode'
              type='text'
              labelText='Zip code'
              value={zipCode}
              handleChange={handleChange}
            />

            <InputField
              name='city'
              type='text'
              labelText='City'
              value={city}
              handleChange={handleChange}
            />

            <InputField
              name='streetAndNumber'
              type='text'
              labelText='Street and number'
              value={streetAndNumber}
              handleChange={handleChange}
            />

            <InputField
              name='email'
              type='text'
              labelText='E-mail'
              value={email}
              handleChange={handleChange}
            />

            <InputField
              name='phoneNumber'
              type='text'
              labelText='Phone number'
              value={phoneNumber}
              handleChange={handleChange}
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
      </Layout>
    </>
  )
}
