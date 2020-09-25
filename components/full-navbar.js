import { useContext, useState } from 'react'
import Link from 'next/link'

import Cart from '../components/cart'

import AppContext from '../context/app-context'
import { logout } from '../utils/auth'
import MenuList from './menu-list'

export default function FullNavbar () {
  const { user, setUser } = useContext(AppContext)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleHamburger = () => {
    document.querySelector('#overlay-menu').classList.toggle('translate-y-full')
  }

  return (
    <>
      {isCartOpen ? <Cart hideCart={() => setIsCartOpen(false)} /> : null}

      <nav className='sticky top-0 z-30 w-full px-4 py-2 bg-white rounded-b-lg shadow xl:py-0 text-primary'>

        <div className='flex items-center justify-between py-1 xl:py-0'>
          <button onClick={toggleHamburger} className='px-4 cursor-pointer md:hidden focus:outline-none' id='burger'>
            <svg className='w-8' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>

          <Link href='/'>
            <a className='focus:outline-none'>
              <h1 className='p-2 text-xl font-bold lg:text-2xl xl:text-3xl '>Sikory.</h1>
            </a>
          </Link>

          <MenuList orientation='horizontal' />

          <button onClick={() => setIsCartOpen(true)} className='px-4 cursor-pointer focus:outline-none' id='burger'>
            <svg className='w-8' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
            </svg>
          </button>
        </div>

      </nav>

      <div id='overlay-menu' className='fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center h-screen transition duration-500 ease-in transform translate-y-full bg-secondary'>
        <ul className='text-2xl'>
          <li className='p-6 text-center'>
            <Link href='/favorites'>
              <a>Favorites</a>
            </Link>
          </li>
          <li className='p-6 text-center'>
            <Link href='/orders'>
              <a>Orders</a>
            </Link>
          </li>
          <li className='p-6 text-center'>
            <Link href='/contact'>
              <a>Contact</a>
            </Link>
          </li>
          {user ? (
            <li className='p-6 text-center'>
              <button
                onClick={() => {
                  logout()
                  setUser(null)
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className='p-6 text-center'>
                <Link href='/register'>
                  <a>Register</a>
                </Link>
              </li>
              <li className='p-6 text-center'>
                <Link href='/login'>
                  <a>Login</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}
