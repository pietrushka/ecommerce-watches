import Head from 'next/head'
import { useRouter } from 'next/router'
import { useReducer, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import Cookies from 'js-cookie'

import Layout from '../components/layout'
import InputField from '../components/input-field'
import PrevPageNavbar from '../components/prev-page-navbar'
import CartItem from '../components/cart-item'
import CustomButton from '../components/custom-button'

import {useCurrentUser} from '../hooks/useCurrentUser'
import { useCart } from '../hooks/useCart'
import { getAllShippingOptions, getAllPaymentOptions } from '../lib/api'
import { placeOrder } from '../utils/order'
import WithSpinner from '../components/with-spinner'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE)

const checkoutReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.field]: action.value
      }
    }

    case 'checkout': {
      return {
        ...state,
        isLoading: true,
        error: ''
      }
    }

    case 'success': {
      return {
        ...state,
        isLoading: false,
        shipping: '',
        payment: '',
        firstName: '',
        lastName: '',
        zipCode: '',
        city: '',
        streetAndNumber: '',
        email: '',
        phoneNumber: '',
        error: ''
      }
    }

    case 'error': {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    }

    case 'set_loading': {
      return {
        ...state,
        isLoading: action.payload
      }
    }

    default:
      break
  }
  return state
}

const initialState = {
  shipping: 'DHL',
  payment: 'Card',
  firstName: '',
  lastName: '',
  zipCode: '',
  city: '',
  streetAndNumber: '',
  email: '',
  phoneNumber: '',
  isLoading: true,
  error: ''
}

export default function Checkout ({ shippingOptions, paymentOptions }) {
  const Router = useRouter()
  const { user } = useCurrentUser()
  const { items, getCartValue, clearCart } = useCart()
  const [state, dispatch] = useReducer(checkoutReducer, initialState)
  const { firstName, lastName, zipCode, city, streetAndNumber, email, phoneNumber, shipping, payment, isLoading, error } = state

  useEffect(() => {
    const token = Cookies.get('tokenSikory')
    if (!token) Router.push('/login')
    if (token && items) dispatch({ type: 'set_loading', payload: false })
  }, [items])

  const getCartValueWithShippingCost = () => {
    const itemsValue = getCartValue()
    if (!shipping) return `$ ${itemsValue}`
    const shippingCost = shippingOptions.find((option) => option.name === shipping).price
    return `$ ${itemsValue + shippingCost}`
  }

  const handleChange = event => {
    dispatch({
      type: 'field',
      field: `${event.target.name}`,
      value: event.target.value
    })
  }

  const checkoutSubmit = async event => {
    event.preventDefault()
    dispatch({ type: 'checkout' })

    const methods = { shipping, payment }
    const token = Cookies.get('tokenSikory')
    const personalData = { firstName, lastName, zipCode, city, streetAndNumber, email, phoneNumber }
    try {
      const stripeResponse = await placeOrder({ items, methods, personalData, user, token })
      const sessionId = stripeResponse.data.id
      const stripe = await stripePromise
      dispatch({ type: 'success' })
      clearCart()
      const { error } = await stripe.redirectToCheckout({ sessionId })
      console.log(error)
    } catch (error) {
      dispatch({ type: 'error', payload: error })
      console.log(error, error.response)
    }
  }

  return (
    <>
      <Layout alignCenter>

        <Head>
          <title>Checkout</title>
          <script src='https://js.stripe.com/v3/' />
        </Head>

        <PrevPageNavbar />

        <WithSpinner isLoading={isLoading}>
          <div style={{ maxWidth: '768px' }}>
            {
              items && (
                items.length === 0 ? (
                  <p className='my-auto text-3xl text-center text-red-500'>Your cart is empty</p>
                ) : (
                  <>
                    <div className='w-4/6 mx-auto'>
                      {
                        items.map(item => <CartItem key={item.id} item={item} />)
                      }
                    </div>

                    <form onSubmit={checkoutSubmit} className='p-4'>

                      <div onChange={handleChange} name='shipping' className='flex flex-col items-center justify-center py-4'>
                        <h2 className='text-2xl text-center'>Shipping options</h2>

                        {
                          shippingOptions.map(({ id, price, name }, index) => (
                            <div key={id} className='w-full'>
                              <input className='hidden fill-label' type='radio' name='shipping' value={name} id={name} defaultChecked={shipping === name} required />
                              <label htmlFor={name} className='block w-4/6 p-2 mx-auto my-2 text-center bg-white rounded-lg shadow'>{`${name} $${price}`}</label>
                            </div>
                          )

                          )
                        }

                      </div>

                      <div onChange={handleChange} className='flex flex-col items-center justify-center py-4'>

                        <h2 className='text-2xl text-center'>Payment methods</h2>

                        {
                          paymentOptions.map(({ id, name }) => (
                            <div key={id} className='w-full'>
                              <input className='hidden fill-label' type='radio' name='payment' value={name} id={name} defaultChecked={payment === name} required />
                              <label htmlFor={name} className='block w-4/6 p-2 mx-auto my-2 text-center bg-white rounded-lg shadow'>{name}</label>
                            </div>
                          ))
                        }

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
                          required
                          handleChange={handleChange}
                        />

                        <InputField
                          name='lastName'
                          type='text'
                          labelText='Last name'
                          value={lastName}
                          required
                          handleChange={handleChange}
                        />

                        {/* Make proper validation in the future */}
                        <InputField
                          name='zipCode'
                          type='text'
                          labelText='Zip code'
                          value={zipCode}
                          required
                          handleChange={handleChange}
                        />

                        <InputField
                          name='city'
                          type='text'
                          labelText='City'
                          value={city}
                          required
                          handleChange={handleChange}
                        />

                        <InputField
                          name='streetAndNumber'
                          type='text'
                          labelText='Street and number'
                          value={streetAndNumber}
                          required
                          handleChange={handleChange}
                        />

                        <InputField
                          name='email'
                          type='email'
                          labelText='E-mail'
                          value={email}
                          required
                          handleChange={handleChange}
                        />

                        <InputField
                          name='phoneNumber'
                          type='tel'
                          labelText='Phone number'
                          value={phoneNumber}
                          required
                          handleChange={handleChange}
                        />

                      </div>

                      {error && (
                        <p className='mb-4 text-lg font-bold text-center text-red-700'>{error}</p>
                      )}

                      <div className='flex items-center justify-center w-full my-2 rounded-t-lg '>
                        <CustomButton
                          width='w-2/3'
                          type='submit'

                        >
                          {
                            isLoading ? 'Loading' : `Submit ${getCartValueWithShippingCost()}`
                          }
                        </CustomButton>
                      </div>
                    </form>
                  </>
                )
              )
            }
          </div>
        </WithSpinner>

      </Layout>
    </>
  )
}

export async function getServerSideProps () {
  const shippingOptions = await getAllShippingOptions()
  const paymentOptions = await getAllPaymentOptions()
  return {
    props: {
      shippingOptions,
      paymentOptions
    }
  }
}
