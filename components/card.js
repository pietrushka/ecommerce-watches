import Link from 'next/link'

import { useCart } from '../hooks/useCart'
import CustomButton from './custom-button'
import Heart from './heart'

export default function Card ({ item }) {
  // console.log('item from card.js', item)
  const { id, brand, price, model, refCode, imageUrl } = item
  const { addItem } = useCart()

  const addToCart = () => addItem(({ id, brand, model, price, refCode, imageUrl, quantity: 1 }))

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
            <h3 className='lg:text-center'>{refCode}</h3>
          </a>
        </Link>

        <Link href={`/product/${refCode}`}>
          <a>
            <h2 className='text-2xl lg:text-center'>
              <span className='lg:block'>{brand}</span> <span className=''>{model}</span>
            </h2>
          </a>
        </Link>

        <Heart size='10' item={item} />

        <div className='flex items-center justify-center w-full py-4'>
          <CustomButton
            width='w-11/12'
            onClick={addToCart}
          >
            <p className='block'>{`Add to cart $${price}`}</p>
          </CustomButton>
        </div>
      </div>
    </div>
  )
}
