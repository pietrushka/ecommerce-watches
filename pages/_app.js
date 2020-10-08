import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import AppContext from '../context/app-context'
import { CartProvider } from '../hooks/useCart'
import { FavoritesProvider } from '../hooks/useFavorites'

import '../styles/index.css'

const { CMS_URL } = process.env

export default function App ({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const providerValue = useMemo(() => ({ user, setUser, isAuthenticated: !!user }), [user, setUser])

  useEffect(() => {
    // grab token value from cookie
    const token = Cookies.get('tokenSikory')

    if (token) {
      // authenticate the token on the server and place set user object
      axios.get(`${CMS_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (res.statusText !== 'OK') {
          Cookies.remove('tokenSikory')
          setUser(null)
          return null
        }
        const user = res.data
        setUser(user)
      })
    }
  }, [])

  return (
    <AppContext.Provider value={providerValue}>
      <CartProvider>
        <FavoritesProvider>
          <>
            <Component {...pageProps} />
          </>
        </FavoritesProvider>
      </CartProvider>
    </AppContext.Provider>
  )
}
