import React, { useState, useContext, createContext, useEffect, useMemo } from 'react'
import Cookies from 'js-cookie'

import {authUser} from '../utils/auth'

const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const providerValue = useMemo(() => ({ user, setUser, isAuthenticated: !!user }), [user, setUser])

  useEffect(() => {
    const checkIsAuth = async () => {
      try {
        const token = Cookies.get('tokenSikory')

        if(!token) return

        const res = await authUser(token)
        
        if (res.statusText === 'OK') {
          const user = res.data
          setUser(user)
        } else {
          Cookies.remove('tokenSikory')
          setUser(null)
        }
      } catch (error) {
        Cookies.remove('tokenSikory')
        setUser(null)
        console.log({error})
      }
    }
    
    checkIsAuth()
  }, [])

  return (
    <CurrentUserContext.Provider
      value={providerValue}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext)
