import Link from 'next/link'
import { useEffect, useRef } from 'react'

import CartItem from './cart-item'
import { useCart } from '../hooks/useCart'

export default function Cart ({ hideCart }) {
  const { items, getCartValue } = useCart()
  const cartValue = getCartValue()
  const refCart = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      refCart.current.classList.remove('translate-y-full')
    }, 200)
  }, [])

  const animateOut = () => {
    refCart.current.classList.add('translate-y-full')
    setTimeout(() => {
      hideCart()
    }, 200)
  }

  return (
    <>
      <div onClick={animateOut} className='fixed top-0 z-40 items-end justify-center w-screen h-screen bg-black bg-opacity-50' />

      <div ref={refCart} className='fixed bottom-0 z-50 w-11/12 m-4 transition-transform duration-200 ease-out transform translate-y-full bg-white rounded-lg'>
        <div className='relative my-1'>
          <h2 className='text-4xl text-center'>Cart</h2>
          <button onClick={animateOut} className='absolute top-0 right-0 w-1/6 focus:outline-none'>
            <svg className='ml-auto ' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {
          items.length > 0
            ? (
              <>
                {
                  items.map(item => <CartItem key={item.id} item={item} />)
                }
                <div className='flex items-center justify-center w-full my-2 rounded-t-lg '>
                  <Link href='/checkout'>
                    <a className='px-20 py-4 text-lg text-white rounded-full shadow-lg bg-primary focus:outline-none'>
                      {`Checkout $${cartValue}`}
                    </a>
                  </Link>
                </div>
              </>
            ) : (
              <p>Your cart is empty</p>
            )
        }

        <div />
      </div>
    </>
  )
}
