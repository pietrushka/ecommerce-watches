import Link from 'next/link'

export default function OrderItem ({ order }) {
  const { id, createdAt, methods, amount, paymentStatus, items } = order

  const date = new Date(createdAt)
  const dateString = date.toLocaleDateString('pl-PL')

  const formatPaymentStatus = () => {
    if (typeof paymentStatus !== 'string') return ''

    if (paymentStatus.includes('-')) {
      const splittedPS = paymentStatus.split('-')
      return `${splittedPS[0]} ${splittedPS[1]}`
    }

    return paymentStatus
  }

  return (

    <div className='w-full p-2 my-2 text-center border rounded-lg justify-evenly border-primary bg-secondary'>

      <div className='flex items-center'>
        <div className='w-1/12'>
          <input type='checkbox' />
        </div>
        <div className='ml-2'>
          <span className='my-auto text-xs text-gray-600 '>{id}</span>
        </div>
        <div className='ml-auto'>
          <span>{dateString}</span>
        </div>
      </div>

      {
        items.map(({ id, brand, model, quantity, price, imageUrl }) => (
          <div key={id} className='flex items-center justify-around m-2 bg-white rounded-lg'>
            <Link href='/'>
              <a className='w-1/4'><img classame='inline-block object-cover' src={imageUrl} /></a>
            </Link>
            <div className='w-2/4'>
              <Link href='/'>
                <a>{`${brand} ${model}`}</a>
              </Link>
            </div>
            <div className='w-1/4'>
              <span>{`${quantity} * ${price}$`}</span>
            </div>
          </div>

        ))
      }

      <div className='flex flex-col'>
        <div>
          <span>{`Shipping: ${methods.shipping.name} (not shipped yet)`}</span>
        </div>
        <div>
          <span>{`Payment: ${methods.payment.name} (${formatPaymentStatus()})`}</span>
        </div>
        <div className=''>
          <span>Total: $ {amount}</span>
        </div>
      </div>
    </div>

  )
}
