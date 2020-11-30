import React, { useContext, createContext, useEffect, useState } from 'react'

import { addItemToFavorites, removeItemFromFavorites, putFavoritesOnDB, getFavoritesFromDB } from '../utils/favorites-utils'
import { useCurrentUser } from './useCurrentUser'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const { isAuthenticated } = useCurrentUser()

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchData = async () => {
      try {
        const res = await getFavoritesFromDB()
        const favFromDB = res.data.favorites
        setFavorites(favFromDB)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [isAuthenticated])

  const addFavorite = async (newFavorite) => {
    try {
      const newFavIds = addItemToFavorites(favorites, newFavorite)
      setFavorites(newFavIds)
      await putFavoritesOnDB(newFavIds)
    } catch (err) {
      console.log(err, err.response)
    }
  }

  const removeFavorite = async (favoriteToRemove) => {
    try {
      const newFavIds = removeItemFromFavorites(favorites, favoriteToRemove)
      setFavorites(newFavIds)
      await putFavoritesOnDB(newFavIds)
    } catch (err) {
      console.log(err, err.response)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
