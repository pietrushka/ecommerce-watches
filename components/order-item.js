export default function OrderItem ({ order }) {
  const { id, createdAt, amount, paymentStatus } = order

  const date = new Date(createdAt)
  const dateString = date.toLocaleDateString('pl-PL')

  return (
    <>
      <div className='w-full p-4 text-lg border rounded-lg border-primary'>
        <div>
          <span>{dateString}</span>
          <span>{paymentStatus}</span>
        </div>
        <p className=''>{id}</p>
        <p className=''>{amount}</p>
      </div>
    </>
  )
}
