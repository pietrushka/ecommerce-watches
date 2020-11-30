import Head from 'next/head'
import Router from 'next/router'
import { useContext, useEffect } from 'react'

import RegisterForm from '../components/register-form'
import Layout from '../components/layout'
import FullNavbar from '../components/full-navbar'
import { useCurrentUser } from '../hooks/useCurrentUser'

export default function RegisterPage () {
  const { isAuthenticated } = useCurrentUser

  useEffect(() => {
    if (isAuthenticated) Router.push('/')
  })

  return (
    <Layout alignCenter>
      <Head>
        <title>Register</title>
      </Head>
      <FullNavbar />

      <div className='flex flex-col items-center justify-center w-11/12 h-auto py-8 my-auto rounded-lg shadow-2xl lg:p-16 md:w-1/2 bg-secondary' style={{ maxWidth: '768px' }}>

        <h2 className='w-4/6 text-3xl'>Register</h2>

        <RegisterForm />
      </div>

    </Layout>
  )
}
