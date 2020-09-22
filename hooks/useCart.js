import React, { useReducer, useContext, createContext } from 'react'

import { addItemToCart, removeItemFromCart, clearItemFromCart, chooseShippingOption } from '../utils/cart-utils'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
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

    case 'CHOOSE_SHIPPING': {
      return {
        ...state,
        shipping: chooseShippingOption(state.shipping, action.payload)
      }
    }
  }
}

const initialState = {
  items: [],
  shipping: {
    cost: 0,
    name: ''
  }
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

  const chooseShipping = (option) => {
    dispatch({ type: 'CHOOSE_SHIPPING', payload: option })
  }

  const getCartValueWithShippingCost = () => {
    const cartValue = getCartValue()
    return cartValue + state.shipping.cost
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        getCartValueWithShippingCost,
        getCartValue,
        clearItem,
        chooseShipping
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
