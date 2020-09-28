import { useContext } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Cookies from 'js-cookie'

import AppContext from '../context/app-context'

export default function MenuList ({ orientation }) {
  const { user, setUser } = useContext(AppContext)

  const liPadding = orientation === 'horizontal' ? 'px-4' : 'p-6'

  const ulClassNames = orientation === 'horizontal'
    ? 'hidden md:flex lg:text-xl xl:text-2xl'
    : 'text-2xl'

  const logout = () => {
    // remove token and user cookie
    Cookies.remove('token')
    delete window.__user

    setUser(null)

    // redirect to the home page
    Router.reload()
  }

  return (

    <ul className={` text-center ${ulClassNames} `}>
      <li className={liPadding}>
        <Link href='/favorites'>
          <a>Favorites</a>
        </Link>
      </li>
      <li className={liPadding}>
        <Link href='/orders'>
          <a>Orders</a>
        </Link>
      </li>
      <li className={liPadding}>
        <Link href='/contact'>
          <a>Contact</a>
        </Link>
      </li>
      {user ? (
        <li className={liPadding}>
          <button onClick={logout}>
                Logout
          </button>
        </li>
      ) : (
        <>
          <li className={liPadding}>
            <Link href='/register'>
              <a>Register</a>
            </Link>
          </li>
          <li className={liPadding}>
            <Link href='/login'>
              <a>Login</a>
            </Link>
          </li>
        </>
      )}
    </ul>
  )
}
