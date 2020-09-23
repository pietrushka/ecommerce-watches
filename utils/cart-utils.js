export const addItemToCart = (cart, cartItemToAdd) => {
  const existingCartItem = cart.find(
    cartItem => cartItem.refCode === cartItemToAdd.refCode
  )

  if (existingCartItem) {
    return cart.map(cartItem =>
      cartItem.refCode === cartItemToAdd.refCode
        ? { ...cartItem, quantity: cartItem.quantity + cartItemToAdd.quantity }
        : cartItem
    )
  }

  return [...cart, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cart, cartItemToRemove) => {
  // check if there is such item in the cart
  const existingCartItem = cart.find(
    cartItem => cartItem.refCode === cartItemToRemove.refCode
  )

  // check if there only one of type
  if (existingCartItem.quantity === 1) {
    return cart.filter(cartItem => cartItem.refCode !== cartItemToRemove.refCode)
  }

  // there ary more then one, so it decrease quantity by 1
  return cart.map(cartItem =>
    cartItem.refCode === cartItemToRemove.refCode
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

export const clearItemFromCart = (cart, cartItemToRemove) => {
  return cart.filter(cartItem => cartItem.refCode !== cartItemToRemove.refCode)
}
