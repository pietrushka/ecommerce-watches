import React, { useReducer, useContext, createContext } from 'react'

import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../utils/cart-utils'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      return {
        items: addItemToCart(state.items, action.payload)
      }
    }

    case 'REMOVE_ITEM': {
      return {
        items: removeItemFromCart(state.items, action.payload)
      }
    }

    case 'CLEAR_ITEM': {
      return {
        items: clearItemFromCart(state.items, action.payload)
      }
    }
  }
}

const initialState = {
  items: []
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

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
