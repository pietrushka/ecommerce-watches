import React, { useReducer, useContext, createContext } from 'react'

import { addItemToCart, removeItemFromCart } from '../utils/cart-utils'

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

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
