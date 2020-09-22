
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { CartProvider } from '../hooks/useCart'

import AppContext from '../context/app-context'

import '../styles/index.css'

export default function App ({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  const providerValue = useMemo(() => ({ user, setUser, isAuthenticated: !!user }), [user, setUser])

  useEffect(() => {
    // grab token value from cookie
    const token = Cookies.get('token')

    if (token) {
    // authenticate the token on the server and place set user object
      axios.get(`${process.env.API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (res.statusText !== 'OK') {
          Cookies.remove('token')
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
        <div>
          <Component {...pageProps} />
        </div>
      </CartProvider>
    </AppContext.Provider>
  )
}
