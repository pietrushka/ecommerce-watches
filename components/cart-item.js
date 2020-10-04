import Link from 'next/link'
import { useCart } from '../hooks/useCart'

export default function CartItem ({ item }) {
  const { addItem, removeItem, clearItem } = useCart()

  const thumbnailUrl = item.cover.formats.small.url

  return (
    <div className='flex items-center justify-around'>
      <Link href={`/${item.id}`}>
        <a className='w-1/3'><img classame='inline-block object-cover' src={thumbnailUrl} /></a>
      </Link>

      <span className='w-1/3 text-center'>{`${item.brand} ${item.model}`}</span>

      <div className='flex flex-col items-center justify-center w-1/12 max-h-full'>
        <button className='w-full' onClick={() => addItem({ ...item, quantity: 1 })}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
          </svg>
        </button>
        <span className='w-full text-center'>{item.quantity}</span>
        <button className='w-full' onClick={() => removeItem({ ...item, quantity: 1 })}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>
      </div>

      <span className='w-1/4 p-2 text-center right-4'>{`$${item.price}`}</span>

      <button
        onClick={() => clearItem({ ...item, quantity: 1 })}
        className='w-1/6 p-1'
      >
        <svg className='p-1 mr-3 text-gray-100 bg-red-600 rounded-full ' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
        </svg>
      </button>
    </div>
  )
}
