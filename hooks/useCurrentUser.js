import React, { useState, useContext, createContext, useEffect, useMemo } from 'react'

import {authUser} from '../utils/auth'


const CurrentUserContext = createContext()


export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const providerValue = useMemo(() => ({ user, setUser, isAuthenticated: !!user }), [user, setUser])

  useEffect(() => {
    const checkIsAuth = async () => {
      try {
        const res = await authUser()
        console.log({res})
  
        if (res.statusText === 'OK') {
          const user = res.data
          setUser(user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.log({error})
        setUser(null)
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
