export const addItemToFavorites = (favorites, favItemToAdd) => {
  // check if there is such item in the cart
  const existingFavItem = favorites.find(
    favItem => favItem.refCode === favItemToAdd.refCode
  )

  if (existingFavItem) return

  return [...favorites, { ...favItemToAdd }]
}

export const removeItemFromFavorites = (favorites, favItemToRemove) => {
  // check if there is such item in the cart
  const existingFavItem = favorites.find(
    favItem => favItem.refCode === favItemToRemove.refCode
  )

  if (!existingFavItem) return

  return favorites.filter(favItem => favItem.refCode !== favItemToRemove.refCode)
}
