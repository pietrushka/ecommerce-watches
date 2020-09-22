import React, { useReducer, useContext, createContext, useEffect } from 'react'

import AppContext from '../context/app-context'
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../utils/cart-utils'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART': {
      return {
        ...state,
        items: action.payload
      }
    }

    case 'ADD_ITEM': {
      return {
        ...state,
        items: addItemToCart(state.items, action.payload)
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: removeItemFromCart(state.items, action.payload)
      }
    }

    case 'CLEAR_ITEM': {
      return {
        ...state,
        items: clearItemFromCart(state.items, action.payload)
      }
    }
  }
}

const initialState = {
  items: []
}

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AppContext)
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    console.log({ user })
    if (!isAuthenticated) {
      window.localStorage.setItem('items', JSON.stringify(state.items))
      console.log('Saved cart to local storage')
    }
  }, [state.items])

  const setCart = () => {
    const items = JSON.parse(window.localStorage.getItem('items'))
    if (items) dispatch({ type: 'SET_CART', payload: items })
  }

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item } })
  }

  const removeItem = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item })
  }

  const clearItem = (item) => {
    dispatch({ type: 'CLEAR_ITEM', payload: item })
  }

  const getCartValue = () => {
    const value = state.items.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    return value
  }

  return (
    <CartContext.Provider
      value={{
        setCart,
        items: state.items,
        addItem,
        removeItem,
        getCartValue,
        clearItem
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
