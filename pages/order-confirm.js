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
      <div className='flex flex-col items-center my-auto'>
        <h1 className='p-4 text-2xl'>Confirm page</h1>
        <h2 className='p-4 text-lg'>Your order {orderId} is on the way</h2>
        <div className='w-1/2 h-auto py-4 mx-auto '>
          <img className='w-50' src='/box.png' />
        </div>
        <Link href='/'>
          <a className='p-4 text-lg text-center rounded-lg bg-primary text-secondary '>Go to homepage</a>
        </Link>

      </div>

    </Layout>

  )
}
