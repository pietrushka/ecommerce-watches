import Head from 'next/head'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { useReducer, useContext, useRef, useEffect } from 'react'

import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import InputField from '../components/input-field'
import CustomButton from '../components/custom-button'

import { setFocus } from '../utils/utils'
import { loginUser } from '../utils/auth'
import AppContext from '../context/app-context'
import Link from 'next/link'

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.field]: action.value
      }
    }

    case 'login': {
      return {
        ...state,
        isLoading: true,
        error: ''
      }
    }

    case 'success': {
      return {
        ...state,
        error: '',
        isLoading: false
      }
    }

    case 'error': {
      return {
        ...state,
        password: '',
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
  identifier: '',
  password: '',
  isLoading: false,
  error: ''
}

export default function LoginPage () {
  const { setUser, isAuthenticated } = useContext(AppContext)
  const passwordRef = useRef()
  const [state, dispatch] = useReducer(loginReducer, initialState)
  const { identifier, password, isLoading, error } = state

  useEffect(() => {
    if (isAuthenticated) return Router.push('/')
  }, [])

  const handleChange = event => {
    dispatch({
      type: 'field',
      field: `${event.target.name}`,
      value: event.target.value
    })
  }

  const onLogin = async event => {
    try {
      event.preventDefault()
      dispatch({ type: 'login' })
      const res = await loginUser(identifier, password)
      dispatch({ type: 'success' })
      Cookies.set('tokenSikory', res.data.jwt, { expires: 1 })
      setUser(res.data.user)
      Router.push('/')
    } catch (error) {
      const message = error.response.data.message[0].messages[0].message
      dispatch({ type: 'error', payload: message })
      setFocus(passwordRef)
    }
  }

  return (
    <Layout alignCenter>
      <Head>
        <title>Login</title>
      </Head>
      <FullNavbar />

      <div className='flex flex-col items-center justify-center w-11/12 h-auto py-8 my-auto rounded-lg shadow-2xl md:w-1/2 bg-secondary' style={{ maxWidth: '768px' }}>
        <div className='w-4/6 '>
          <p className='text-sm text-center'>Test credentials<br />Identifier: test<br />password: password</p>
          <h2 className='w-full py-4 text-3xl'>Login</h2>
        </div>

        <form
          onSubmit={onLogin}
          className='flex flex-col items-center w-full'
        >

          <InputField
            name='identifier'
            type='text'
            autoFocus
            labelText='Identifier'
            aria-label='identifier-input'
            value={identifier}
            required
            handleChange={handleChange}
          />

          <InputField
            name='password'
            type='password'
            labelText='Password'
            aria-label='password-input'
            value={password}
            reference={passwordRef}
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
              {!isLoading ? 'Login' : 'Loading...'}
            </CustomButton>
          </div>

          <p className='h-8 py-2 text-center'>
            If you don't have an account - <Link href='/register'><a className='inline-block font-bold transform hover:-skew-y-6'>Register</a></Link>
          </p>'
        </form>
      </div>
    </Layout>
  )
}
