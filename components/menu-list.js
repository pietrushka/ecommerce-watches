import { useContext } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Cookies from 'js-cookie'

import AppContext from '../context/app-context'

export default function MenuList ({ orientation, closeMenu }) {
  const { user, setUser } = useContext(AppContext)

  const liStyles = orientation === 'horizontal' ? 'px-4' : 'px-8 py-3 text-center bg-white my-8 rounded-lg border-2 border-primary'

  const ulClassNames = orientation === 'horizontal'
    ? 'hidden md:flex lg:text-xl xl:text-2xl'
    : 'text-3xl'

  const logout = () => {
    // remove token and user cookie
    Cookies.remove('token')
    delete window.__user

    setUser(null)
    Router.push('/')
    // redirect to the home page
    Router.reload()
  }

  return (

    <ul className={` text-center ${ulClassNames} `}>
      <li className={liStyles} onClick={closeMenu}>
        <Link href='/favorites'>
          <a>Favorites</a>
        </Link>
      </li>
      <li className={liStyles} onClick={closeMenu}>
        <Link href='/orders'>
          <a>Orders</a>
        </Link>
      </li>
      <li className={liStyles} onClick={closeMenu}>
        <Link href='/contact'>
          <a>Contact</a>
        </Link>
      </li>
      {user ? (
        <li className={liStyles} onClick={closeMenu}>
          <button onClick={logout}>
                Logout
          </button>
        </li>
      ) : (
        <>
          <li className={liStyles} onClick={closeMenu}>
            <Link href='/register'>
              <a>Register</a>
            </Link>
          </li>
          <li className={liStyles} onClick={closeMenu}>
            <Link href='/login'>
              <a>Login</a>
            </Link>
          </li>
        </>
      )}
    </ul>
  )
}
