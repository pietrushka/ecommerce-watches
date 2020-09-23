import Link from 'next/link'

import { useCart } from '../hooks/useCart'
import Heart from './heart'

export default function Card ({ id, brand, model, price, imageUrl, refCode }) {
  const { addItem } = useCart()

  return (
    <div className='bg-white rounded-lg shadow-lg'>
      <div className='relative p-2'>
        <Link href={`/product/${refCode}`}>
          <a>
            <img src={imageUrl} />
          </a>
        </Link>

        <Link href={`/product/${refCode}`}>
          <a>
            <h2 className='cursor-pointer'>{refCode}</h2>
          </a>
        </Link>

        <Link href={`/product/${refCode}`}>
          <a>
            <h1 className='block text-2xl cursor-pointer'>{`${brand} ${model}`}</h1>
          </a>
        </Link>

        <Heart size='10' />

        <div className='flex items-center justify-center w-full py-4'>
          <button
            onClick={() => addItem({
              id,
              brand,
              model,
              price,
              refCode,
              imageUrl,
              quantity: 1
            })}
            className='px-20 py-4 text-lg text-white rounded-full shadow-lg bg-primary focus:outline-none'
          >
            {`Add to cart $${price}`}
          </button>
        </div>
      </div>
    </div>
  )
}
