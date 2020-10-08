import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import AppContext from '../context/app-context'
import { useCart } from '../hooks/useCart'

export default function MenuList ({ orientation, closeMenu }) {
  const Router = useRouter()
  const { user, setUser } = useContext(AppContext)
  const { clearCart } = useCart()
  const pathName = Router.pathname.slice(1)
  console.log(pathName)

  const liStyles = optionName => {
    if (orientation === 'horizontal') {
      let horizontalStyles = 'text-lg font-bold px-6 relative'

      if (optionName === pathName) {
        horizontalStyles = `${horizontalStyles} addFixedUnderline`
      } else {
        horizontalStyles = `${horizontalStyles} addMenuUnderlineOnHover`
      }

      return horizontalStyles
    } else {
      let verticalStyles = 'px-6 py-2 text-center my-5 rounded-full border-2 border-primary'
      const invertStyles = 'bg-primary text-secondary'
      if (optionName === pathName) {
        verticalStyles = `${verticalStyles} ${invertStyles}`
      } else {
        verticalStyles = `${verticalStyles} bg-secondary text-primary hover:bg-primary hover:text-secondary`
      }
      return verticalStyles
    }
  }

  const ulClassNames = orientation === 'horizontal'
    ? 'hidden md:flex lg:text-xl xl:text-2xl'
    : 'text-3xl flex flex-col justify-center mt-20'

  const logout = async () => {
    // remove token and user cookie
    await Cookies.remove('tokenSikory')
    delete window.__user

    setUser(null)
    await clearCart()
    // redirect to the home page
    Router.push('/')
    Router.reload()
  }

  return (

    <ul className={` text-center ${ulClassNames} `}>
      <li className={liStyles('favorites')} onClick={closeMenu}>
        <Link href='/favorites'>
          <a className='outline-none'>Favorites</a>
        </Link>
      </li>
      <li className={liStyles('orders')} onClick={closeMenu}>
        <Link href='/orders'>
          <a className='outline-none'>Orders</a>
        </Link>
      </li>
      <li className={liStyles('contact')} onClick={closeMenu}>
        <Link href='/contact'>
          <a className='outline-none'>Contact</a>
        </Link>
      </li>
      {user ? (
        <li className={liStyles('logout')} onClick={closeMenu}>
          <button className='font-bold outline-none' onClick={logout}>Logout</button>
        </li>
      ) : (
        <>
          <li className={liStyles('register')} onClick={closeMenu}>
            <Link href='/register'>
              <a className='outline-none'>Register</a>
            </Link>
          </li>
          <li className={liStyles('login')} onClick={closeMenu}>
            <Link href='/login'>
              <a className='outline-none'>Login</a>
            </Link>
          </li>
        </>
      )}
    </ul>
  )
}
