import Head from 'next/head'
import Link from 'next/link'
import { useReducer } from 'react'

import InputField from '../components/InputField/InputField'

const checkoutReducer = (state, action) => {
  switch(action.type) {

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
        isLoading: false,
      }
    }

    case 'error': { 
      return { 
        ...state,
        error: 'Wrong password',
        isLoading: false,
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
  postalCode: '',
  city: '',
  streetAndNumber: '',
  email: '',
  phoneNumber: '',
  isLoading: false,
  error: '',
}

export default function Options() {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)
  const {firstName, lastName, postalCode, city, streetAndNumber, email, phoneNumber, isLoading, error} = state
  
  const handleChange = event => {
    dispatch({
      type: "field",
      field: `${event.target.name}`,
      value: event.target.value
    })
  }

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>

      <div className='p-2 rounded-b-lg shadow-lg bg-secondary'>
        <h2 className='text-xl text-center'>Cart summary</h2>
        <div className='flex items-center justify-center'>
          <img className='inline-block object-cover w-1/6' src='https://wkruk.pl/product_picture/square_1024/55a0661afdb58cf2a4076feb7e4b09e3.png' />

          <span className='w-1/3 text-center'>Omega</span>

          <span className='w-1/3 text-center right-4'>$396</span>
        </div>
      </div>

      <form className='p-4'>

        <div onChange={handleChange} name='shipping' className='flex flex-col items-center justify-center py-4'>
          <h2 className='text-2xl text-center'>Shipping options</h2>
              
          <input className='hidden fill-label' type='radio' name='shipping' value='dhl' id='dhl'/>
          <label htmlFor='dhl' className='block w-4/6 p-2 my-2 text-center bg-white rounded-lg shadow'>DHL $10</label>

          <input className='hidden fill-label' type='radio' name='shipping' value='gls' id='gls'/>
          <label htmlFor='gls' className='block w-4/6 p-2 my-2 text-center bg-white rounded-lg shadow'>GLS $11</label>

          <input className='hidden fill-label' type='radio' name='shipping' value='dpd' id='dpd'/>
          <label htmlFor='dpd' className='block w-4/6 p-2 my-2 text-center bg-white rounded-lg shadow'>DPD $12</label>
        </div>

        <div onChange={handleChange} className='flex flex-col items-center justify-center py-4'>

          <h2 className='text-2xl text-center'>Payment methods</h2>

          <input className='hidden fill-label' type='radio' name='payment' id='card' value='card'/>
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
            labelText='First Name' 
            value={firstName}
            handleChange={handleChange}
          />

          <InputField 
            name='lastName'
            type='text'
            labelText='Last Name' 
            value={lastName}
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
    </>
  )
}