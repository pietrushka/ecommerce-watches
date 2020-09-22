import Link from 'next/link'
import { useRouter } from 'next/router'

export default function PaymentPage () {
  const { query } = useRouter()
  const orderId = query.orderId

  return (
    <>
      <h1>Confirmation page </h1>
      <h2>Payment {orderId} succesfull</h2>
      <Link href='/'>
        <a className='p-2 ml-24 text-center bg-blue-500 '>Go to homepage</a>
      </Link>
    </>
  )
}
