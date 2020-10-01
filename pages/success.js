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
        <title>Order coonfirm</title>
      </Head>
      <FullNavbar />
      <div className='flex flex-col items-center w-3/4 m-auto md:w-1/2' style={{ maxWidth: '768px' }}>
        <h1 className='p-1 m-2 text-2xl border-b-2 border-primary'>Confirm page</h1>
        <h2 className='p-4 text-center md:text-lg'>Your order <span className='block font-bold sm:inline'>{orderId}</span> is on the way</h2>
        <div className='w-2/3 h-auto py-4 mx-auto md:w-1/3 '>
          <img className='' src='/box.png' />
        </div>
        <Link href='/orders'>
          <a className='p-4 mt-2 text-lg text-center rounded-lg text-primary'>Check your orders</a>
        </Link>
        <Link href='/'>
          <a className='p-4 mt-2 text-lg text-center rounded-lg bg-primary text-secondary'>Go to homepage</a>
        </Link>

      </div>

    </Layout>

  )
}
