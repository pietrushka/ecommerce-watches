import Head from 'next/head'
import { useState } from 'react'

import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import InputField from '../components/input-field'

export default function ContactPage () {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState(false)

  // simulate call to lambda function
  const sendMessage = (email, message) => {
    return new Promise(function (resolve) {
      setTimeout(() => resolve(window.alert(message)), 2000)
    })
  }

  const onSubmit = async (event) => {
    try {
      event.preventDefault()
      setLoading(true)
      await sendMessage(email, message)
      setLoading(false)
      setEmail('')
      setMessage('')
    } catch (error) {
      window.alert(error)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Contact</title>
      </Head>
      <FullNavbar />

      <div className='flex flex-col items-center w-5/6 m-auto shadow-xl' style={{ maxWidth: '768px' }}>
        <h1 className='p-1 m-3 text-2xl border-b-2 border-primary'>Contact us</h1>
        <form onSubmit={onSubmit} className='flex flex-col items-center w-full h-auto py-4 md:w-1/2 lg:py-8 xl:py-16'>
          <InputField
            name='email'
            type='email'
            autoFocus
            labelText='Email'
            aria-label='email-input'
            value={email}
            handleChange={(event) => setEmail(event.target.value)}
            required
          />

          <InputField
            name='message'
            type='text'
            autoFocus
            labelText='Message'
            aria-label='message-input'
            value={message}
            handleChange={(event) => setMessage(event.target.value)}
            required
          />

          <div className='flex items-center justify-center w-3/4 pt-4 xl:pt-8'>
            <button
              type='submit'
              disabled={isLoading}
              className='w-3/4 py-4 text-lg text-white rounded-full shadow-lg bg-primary focus:outline-none'
            >
              {!isLoading ? 'Send message' : 'Loading...'}
            </button>
          </div>
        </form>
      </div>

    </Layout>
  )
}
