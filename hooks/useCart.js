import React, { useState, useContext, createContext, useEffect } from 'react'

import AppContext from '../context/app-context'
import { addItemToCart, removeItemFromCart, clearItemFromCart, putCartOnDB, getCartFromDB } from '../utils/cart-utils'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const { isAuthenticated } = useContext(AppContext)

  useEffect(() => {
    if (!isAuthenticated) {
      const cartFromLS = JSON.parse(window.localStorage.getItem('cart'))
      setCart(cartFromLS)
    }

    const fetchData = async () => {
      try {
        const res = await getCartFromDB()
        const cartFromDB = res.data.cart
        console.log(cartFromDB)
        if (cartFromDB === undefined) return setCart([])
        setCart(cartFromDB)
      } catch (err) {
        console.log(err)
      }
    }

    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      window.localStorage.setItem('items', JSON.stringify(cart))
    }
  }, [cart])

  const addItem = async (itemToAdd) => {
    const newCart = addItemToCart(cart, itemToAdd)
    setCart(newCart)

    if (!isAuthenticated) return

    try {
      await putCartOnDB(newCart)
    } catch (err) {
      console.log(err, err.response)
    }
  }

  const removeItem = async (itemToRemove) => {
    const newCart = removeItemFromCart(cart, itemToRemove)
    setCart(newCart)

    if (!isAuthenticated) return

    try {
      await putCartOnDB(newCart)
    } catch (err) {
      console.log(err, err.response)
    }
  }

  const clearItem = async (cart, itemToClear) => {
    const newCart = clearItemFromCart(cart, itemToClear)
    setCart(newCart)

    if (!isAuthenticated) return

    try {
      await putCartOnDB(newCart)
    } catch (err) {
      console.log(err, err.response)
    }
  }

  const clearCart = async () => {
    const newCart = []
    setCart([])

    if (!isAuthenticated) return

    try {
      await putCartOnDB(newCart)
    } catch (err) {
      console.log(err, err.response)
    }
  }

  const getCartValue = () => {
    const value = cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    return value
  }

  return (
    <CartContext.Provider
      value={{
        items: cart,
        addItem,
        removeItem,
        getCartValue,
        clearItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
