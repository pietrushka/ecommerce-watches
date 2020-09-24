import Head from 'next/head'
import Router from 'next/router'
import { useReducer } from 'react'

import Layout from '../components/layout'
import InputField from '../components/input-field'
import PrevPageNavbar from '../components/prev-page-navbar'
import CartItem from '../components/cart-item'

import { useCart } from '../hooks/useCart'
import { getAllShippingOptions, getAllPaymentOptions } from '../lib/api'
import { placeOrder } from '../lib/order'

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
        error: 'error',
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

export default function Options ({ shippingOptions, paymentOptions }) {
  const { items, getCartValue, clearCart } = useCart()
  const [state, dispatch] = useReducer(checkoutReducer, initialState)
  const { firstName, lastName, zipCode, city, streetAndNumber, email, phoneNumber, shipping, payment } = state

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

  const checkoutSubmit = event => {
    event.preventDefault()
    dispatch({ type: 'checkout' })

    const methods = { shipping, payment }
    const personalData = { firstName, lastName, zipCode, city, streetAndNumber, email, phoneNumber }
    const user = null

    placeOrder({ items, methods, personalData, user })
      .then(({ orderId, paymentMethod }) => {
        dispatch({ type: 'success' })

        clearCart()
        // when user pays on delivery redirect to confirm page
        if (paymentMethod.toLowerCase().trim() === 'cash on delivery') {
          return Router.push({
            pathname: '/order-confirm',
            query: { orderId }
          })
        }

        // redirect to payment
        return Router.push({
          pathname: '/payment',
          query: { orderId }
        })
      })
      .catch((error) => {
        dispatch({ type: 'error', payload: error })
      })
  }

  return (
    <>
      <Layout>

        <Head>
          <title>Checkout</title>
        </Head>

        <PrevPageNavbar />

        {
          items.length === 0
            ? (
              <p className='my-auto text-3xl text-center text-red-500'>Your cart is empty</p>
            ) : (
              <>
                {
                  items.map(item => <CartItem key={item.id} item={item} />)
                }

                <form onSubmit={checkoutSubmit} className='p-4'>

                  <div onChange={handleChange} name='shipping' className='flex flex-col items-center justify-center py-4'>
                    <h2 className='text-2xl text-center'>Shipping options</h2>

                    {
                      shippingOptions.map(({ id, price, name }, index) => (
                        <div key={id} className='w-full'>
                          <input className='hidden fill-label' type='radio' name='shipping' value={name} id={name} required />
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
                          <input className='hidden fill-label' type='radio' name='payment' value={name} id={name} required />
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

                  <div className='flex items-center justify-center w-full my-2 rounded-t-lg '>
                    <button
                      type='submit'
                      className='px-20 py-4 text-lg text-white rounded-full shadow-lg bg-primary focus:outline-none'
                    >
                      Submit {getCartValueWithShippingCost()}
                    </button>
                  </div>
                </form>
              </>
            )
        }
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
