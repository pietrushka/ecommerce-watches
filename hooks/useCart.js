import React, { useState, useContext, createContext, useEffect } from 'react'
import Cookies from 'js-cookie'

import { addItemToCart, removeItemFromCart, clearItemFromCart, putCartOnDB, getCartFromDB } from '../utils/cart-utils'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const token = Cookies.get('tokenSikory')

  useEffect(() => {
    if (!token) {
      const cartFromLS = JSON.parse(window.localStorage.getItem('cart'))
      if (cartFromLS) {
        return setCart(cartFromLS)
      } else {
        return setCart([])
      }
    }

    const fetchData = async () => {
      try {
        const res = await getCartFromDB()
        const cartFromDB = res.data.cart

        if (!cartFromDB || cartFromDB.length === 0) {
          // those items won't save in db unless user do sth with cart
          const cartFromLS = JSON.parse(window.localStorage.getItem('cart'))
          return setCart(cartFromLS)
        } else {
          return setCart(cartFromDB)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [token])

  useEffect(() => {
    if (!token) {
      window.localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  const addItem = async (itemToAdd) => {
    const newCart = addItemToCart(cart, itemToAdd)
    setCart(newCart)

    if (!token) return

    try {
      await putCartOnDB(newCart)
    } catch (err) {
      console.log(err, err.response)
    }
  }

  const removeItem = async (itemToRemove) => {
    const newCart = removeItemFromCart(cart, itemToRemove)
    setCart(newCart)

    if (!token) return

    try {
      await putCartOnDB(newCart)
    } catch (err) {
      console.log(err, err.response)
    }
  }

  const clearItem = async (itemToClear) => {
    const newCart = clearItemFromCart(cart, itemToClear)
    setCart(newCart)

    if (!token) return

    try {
      await putCartOnDB(newCart)
    } catch (err) {
      console.log(err, err.response)
    }
  }

  const clearCart = async () => {
    await window.localStorage.setItem('cart', JSON.stringify([]))
    const freshToken = Cookies.get('tokenSikory')
    if (!freshToken) return
    try {
      const newCart = []
      setCart([])
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

  const getCartItemsQuantity = () => {
    if (!cart || cart.length === 0) return 0
    const value = cart.reduce((acc, item) => {
      return acc + item.quantity
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
        clearCart,
        getCartItemsQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
