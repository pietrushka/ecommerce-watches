import Head from 'next/head'

import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import InputField from '../components/input-field'

export default function LoginPage () {
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

        <InputField
          name='email'
          type='email'
          labelText='E-mail'
          value=''
          handleChange=''
        />

        <InputField
          name='password'
          type='password'
          labelText='Password'
          value=''
          handleChange=''
        />

        <div className='flex items-center justify-center w-full pt-8'>
          <button className='px-20 py-4 text-lg text-white rounded-full shadow-lg bg-primary focus:outline-none'>
                Login
          </button>
        </div>
      </div>

    </Layout>
  )
}
