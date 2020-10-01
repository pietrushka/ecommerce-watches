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

      <div className='flex items-center md:py-3'>
        <div className='ml-2'>
          <span className='my-auto text-sm text-gray-700 lg:text-lg'>{id}</span>
        </div>
        <div className='ml-auto mr-2 lg:text-lg'>
          <span>{dateString}</span>
        </div>
      </div>

      {
        items.map(({ id, brand, model, quantity, price, cover }) => (
          <div key={id} className='flex items-center justify-around mx-2 my-4 bg-white rounded-lg md:text-lg xl:text-xl'>
            <Link href='/'>
              <a className='w-1/4 lg:w-1/6'><img classame='inline-block object-cover' src={cover.formats.small.url} /></a>
            </Link>
            <div className='w-2/4'>
              <Link href='/'>
                <a>{`${brand} ${model}`}</a>
              </Link>
            </div>
            <div className='w-1/4 lg:w-1/6'>
              <span>{`${quantity} * ${price}$`}</span>
            </div>
          </div>

        ))
      }

      <div className='flex flex-col mt-4 mb-2 md:text-lg xl:text-xl'>
        <div>
          <span>{`Shipping: ${methods.shipping.name} (not shipped yet)`}</span>
        </div>
        <div className='py-1'>
          <span>{`Payment: ${methods.payment.name}`}</span> <span className='font-bold'>({formatPaymentStatus()})</span>
        </div>
        <div className=''>
          <span>Total: {amount}$</span>
        </div>
      </div>
    </div>

  )
}
