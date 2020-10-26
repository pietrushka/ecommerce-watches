import axios from 'axios'
import Cookies from 'js-cookie'

const { CMS_URL } = process.env

export const putCartOnDB = async (cart) => {
  const token = Cookies.get('tokenSikory')
  // const jsonCart = await cart.json()
  const url = `${CMS_URL}/users/updateMe`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(url, { cart }, config)
}

export const getCartFromDB = async () => {
  const token = Cookies.get('tokenSikory')
  if (!token) return
  const url = `${CMS_URL}/users/getMyCart`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  return await axios.get(url, config)
}

export const addItemToCart = (cart, cartItemToAdd) => {
  const existingCartItem = cart.find(
    cartItem => cartItem.id === cartItemToAdd.id
  )

  if (existingCartItem) {
    return cart.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + cartItemToAdd.quantity }
        : cartItem
    )
  }
  
  if(!cartItemToAdd.quantity) return [...cart, { ...cartItemToAdd, quantity: 1 }]
  return [...cart, { ...cartItemToAdd, quantity: cartItemToAdd.quantity }]
}

export const removeItemFromCart = (cart, cartItemToRemove) => {
  // check if there is such item in the cart
  const existingCartItem = cart.find(
    cartItem => cartItem.id === cartItemToRemove.id
  )

  // check if there only one of type
  if (existingCartItem.quantity === 1) {
    return cart.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  // there ary more then one, so it decrease quantity by 1
  return cart.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

export const clearItemFromCart = (cart, cartItemToRemove) => {
  return cart.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}
