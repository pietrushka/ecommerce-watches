import Link from 'next/link'
import { useRouter } from 'next/router'

export default function PaymentPage () {
  const { query } = useRouter()
  const orderId = query.orderId
  console.log(query)

  return (
    <>
      <h1>Payment page</h1>
      <h2>Order: {orderId}</h2>
      <Link href={{ pathname: '/order-confirm', query: { orderId } }}>
        <a className='p-2 ml-24 text-center bg-blue-500 '>pay ;)</a>
      </Link>
    </>
  )
}
