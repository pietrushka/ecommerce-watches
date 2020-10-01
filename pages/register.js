import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { useReducer, useContext, useRef, useEffect } from 'react'

import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import InputField from '../components/input-field'
import CustomButton from '../components/custom-button'

import { setFocus } from '../utils/utils'
import { registerUser } from '../utils/auth'
import AppContext from '../context/app-context'

const registerReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.field]: action.value
      }
    }

    case 'register': {
      return {
        ...state,
        isLoading: true,
        error: ''
      }
    }

    case 'success': {
      return {
        ...state,
        isLoading: false
      }
    }

    case 'error': {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    }

    default:
      break
  }
  return state
}

const initialState = {
  username: '',
  email: '',
  password: '',
  isLoading: false,
  error: ''
}

export default function RegisterPage () {
  const { setUser, isAuthenticated } = useContext(AppContext)
  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const [state, dispatch] = useReducer(registerReducer, initialState)
  const { username, email, password, isLoading, error } = state

  useEffect(() => {
    if (isAuthenticated) Router.push('/')
  })

  const handleChange = event => {
    dispatch({
      type: 'field',
      field: `${event.target.name}`,
      value: event.target.value
    })
  }

  const onRegister = async event => {
    try {
      event.preventDefault()
      dispatch({ type: 'register' })
      const res = await registerUser(username, email, password)
      dispatch({ type: 'success' })
      setUser(res.data.user)
      Cookies.set('token', res.data.jwt, { expires: 1 })
      Router.push('/')
    } catch (error) {
      const message = error.response.data.message[0].messages[0].message
      if (message === 'Username already taken') setFocus(usernameRef)
      if (message === 'Email is already taken.') setFocus(emailRef)
      dispatch({ type: 'error', payload: message })
    }
  }

  return (
    <Layout alignCenter>
      <Head>
        <title>Register</title>
      </Head>
      <FullNavbar />

      <div className='flex flex-col items-center justify-center w-11/12 h-auto py-8 my-auto rounded-lg shadow-2xl lg:p-16 md:w-1/2 bg-secondary' style={{ maxWidth: '768px' }}>

        <div className='w-4/6'>
          <h2 className='w-full text-2xl'>Register</h2>
        </div>

        <form onSubmit={onRegister} className='flex flex-col items-center w-full'>

          <InputField
            name='username'
            type='text'
            autoFocus
            labelText='Username'
            value={username}
            reference={usernameRef}
            required
            handleChange={handleChange}
          />

          <InputField
            name='email'
            type='email'
            labelText='E-mail'
            value={email}
            reference={emailRef}
            required
            handleChange={handleChange}
          />

          <InputField
            name='password'
            type='password'
            labelText='Password'
            value={password}
            required
            handleChange={handleChange}
          />

          <p className='h-8 py-2 text-center text-red-600 '>{error}</p>

          <div className='flex items-center justify-center w-full pt-4'>
            <CustomButton
              type='submit'
              disabled={isLoading}
              width='w-1/3'
            >
              {!isLoading ? 'Register' : 'Loading...'}
            </CustomButton>
          </div>
          <p className='h-8 py-2 text-center'>If you alreadt have an account - <Link href='/register'><a className='font-bold'>Login</a></Link></p>
        </form>

      </div>

    </Layout>
  )
}
