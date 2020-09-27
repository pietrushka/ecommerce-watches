import React, { useReducer, useContext, createContext, useEffect } from 'react'

import { addItemToFavorites, removeItemFromFavorites } from '../utils/favorites-utils'

const FavoritesContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVORITES': {
      return {
        ...state,
        favorites: action.payload
      }
    }

    case 'ADD_FAVORITE': {
      return {
        ...state,
        favorites: addItemToFavorites(state.favorites, action.payload)
      }
    }

    case 'REMOVE_FAVORITE': {
      return {
        ...state,
        favorites: removeItemFromFavorites(state.favorites, action.payload)
      }
    }
  }
}

const initialState = {
  favorites: []
}

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    if (state.favorites.length === 0) setFavorites()
  }, [])

  useEffect(() => {
    window.localStorage.setItem('favorites', JSON.stringify(state.favorites))
  }, [state.favorites])

  const setFavorites = () => {
    const favorites = JSON.parse(window.localStorage.getItem('favorites'))
    if (favorites) dispatch({ type: 'SET_FAVORITES', payload: favorites })
  }

  const addFavorite = (favorite) => {
    dispatch({ type: 'ADD_FAVORITE', payload: { ...favorite } })
  }

  const removeFavorite = (favorite) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: favorite })
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        addFavorite,
        removeFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
