import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Overlay () {
  const router = useRouter()

  let overlayBg, cart

  useEffect(() => {
    overlayBg = document.querySelector('#overlayBg')
    cart = document.querySelector('#cart')
  })

  const toggleHamburger = () => {
    document.querySelector('#overlay-menu').classList.toggle('translate-y-full')
  }

  // toggle doesnt't applay transition when cart is hidding
  const showCart = () => {
    overlayBg.classList.remove('hidden')
    cart.classList.remove('hidden')
    setTimeout(() => {
      cart.classList.remove('translate-y-full')
    }, 100)
  }

  const hideCart = () => {
    cart.classList.add('translate-y-full')
    setTimeout(() => {
      cart.classList.add('hidden')

      overlayBg.classList.add('hidden')
    }, 100)
  }

  return (
    <>
      <div id='overlayBg' onClick={hideCart} className='fixed top-0 z-40 flex items-end justify-center hidden w-screen h-screen bg-black bg-opacity-50' />

      <div id='cart' className='fixed bottom-0 z-50 hidden w-11/12 m-4 transition-transform duration-300 ease-out transform translate-y-full bg-white rounded-lg'>
        <div className='relative my-1'>
          <h2 className='text-4xl text-center'>Cart</h2>
          <button onClick={hideCart} className='absolute top-0 right-0 w-1/6 focus:outline-none'>
            <svg className='ml-auto ' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        <div className='flex items-center'>
          <img className='inline-block object-cover w-1/3' src='https://wkruk.pl/product_picture/square_1024/55a0661afdb58cf2a4076feb7e4b09e3.png' />

          <span className='w-1/3 text-center'>Omega</span>

          <span className='w-1/3 p-2 text-center right-4'>$396</span>
          <button className='w-1/6 p-1'>
            <svg className='p-1 mr-3 text-gray-100 bg-red-600 rounded-full ' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
            </svg>
          </button>
        </div>

        <div className='flex items-center justify-center w-full my-2 rounded-t-lg '>
          <Link href='/checkout'>
            <a className='px-20 py-4 text-lg text-white rounded-full shadow-lg bg-primary focus:outline-none'>
                Checkout $395
            </a>
          </Link>
        </div>

        <div />
      </div>

      <nav className='sticky top-0 z-30 w-full px-4 py-2 bg-white rounded-b-lg shadow text-primary'>
        {
          router.pathname === '/checkout'
            ? (
              <Link href='/'>
                <a className='block w-10'>
                  <svg className='w-full' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                  </svg>
                </a>
              </Link>
            )
            : (
              <div className='flex items-center justify-between py-1'>
                <button onClick={toggleHamburger} className='px-4 cursor-pointer md:hidden focus:outline-none' id='burger'>
                  <svg className='w-8' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                  </svg>
                </button>

                <Link href='/'>
                  <a className='focus:outline-none'>
                    <h1 className='p-4 text-xl font-bold'>Sikory.</h1>
                  </a>
                </Link>

                <button onClick={showCart} className='px-4 cursor-pointer md:hidden focus:outline-none' id='burger'>
                  <svg className='w-8' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                  </svg>
                </button>

              </div>
            )
        }
      </nav>

      <div id='overlay-menu' className='fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center h-screen transition duration-500 ease-in transform translate-y-full bg-secondary'>
        <ul className='text-2xl'>
          <li className='p-6 text-center'>Favorites</li>
          <li className='p-6 text-center'>About</li>
          <li className='p-6 text-center'>Contact</li>
          <li className='p-6 text-center'>Login</li>
          <li className='p-6 text-center'>Register</li>
        </ul>
      </div>
    </>
  )
}
