import Head from 'next/head'
import { useReducer, useContext } from 'react'

import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import InputField from '../components/input-field'

import { loginUser } from '../lib/auth'
import AppContext from '../context/app-context'

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
        isLoading: false
      }
    }

    case 'error': {
      return {
        ...state,
        error: 'Error',
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
  const appContext = useContext(AppContext)

  const [state, dispatch] = useReducer(loginReducer, initialState)
  const { identifier, password, isLoading } = state

  const handleChange = event => {
    dispatch({
      type: 'field',
      field: `${event.target.name}`,
      value: event.target.value
    })
  }

  const onLogin = event => {
    event.preventDefault()
    dispatch({ type: 'login' })
    loginUser(identifier, password)
      .then((res) => {
        // set authed user in global context object
        appContext.setUser(res.data.user)
        dispatch({ type: 'success' })
      })
      .catch((error) => {
        dispatch({ type: 'error', payload: error })
      })
  }

  return (
    <Layout color='bg-brown'>
      <Head>
        <title>Login</title>
      </Head>
      <FullNavbar />

      <div className='flex flex-col items-center justify-center h-auto py-10 my-auto rounded-lg bg-secondary'>
        <div className='w-4/6'>
          <h2 className='w-full text-2xl'>Login</h2>
        </div>

        <form
          onSubmit={onLogin}
          className='flex flex-col items-center w-full'
        >

          <InputField
            name='identifier'
            type='text'
            labelText='E-mail'
            value={identifier}
            handleChange={handleChange}
          />

          <InputField
            name='password'
            type='password'
            labelText='Password'
            value={password}
            handleChange={handleChange}
          />

          <div className='flex items-center justify-center w-full pt-8'>
            <button
              type='submit'
              disabled={isLoading}
              className='px-20 py-4 text-lg text-white rounded-full shadow-lg bg-primary focus:outline-none'
            >
            Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
