import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import FullNavbar from '../components/full-navbar'
import Layout from '../components/layout'

export default function PaymentPage () {
  const { query } = useRouter()
  const orderId = query.orderId

  return (
    <Layout>
      <Head>
        <title>Order canceled</title>
      </Head>
      <FullNavbar />
      <div className='flex flex-col items-center w-3/4 m-auto md:w-2/3' style={{ maxWidth: '768px' }}>
        <h1 className='p-1 m-3 text-2xl border-b-2 border-primary'>Order canceled</h1>
        <h2 className='p-4 text-center md:text-lg'>Your order <span className='block font-bold sm:inline'>{orderId}</span> has been cancelled</h2>
        <div className='w-2/3 h-auto py-4 mx-auto md:w-1/3 '>
          <img className='' src='/broken-heart.png' />
        </div>
        <Link href='/'>
          <a className='p-4 mt-8 text-lg text-center rounded-lg bg-primary text-secondary'>Go to homepage</a>
        </Link>

      </div>

    </Layout>

  )
}
