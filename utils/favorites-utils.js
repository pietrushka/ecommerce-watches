import axios from 'axios'
const { CMS_URL } = process.env

export const putFavoritesOnDB = async (favorites) => {
  const url = `${CMS_URL}/users/updateMe`
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  }
  return axios.put(url, { favorites }, config)
}

export const getFavoritesFromDB = async () => {
  const url = `${CMS_URL}/users/getMyFavorites`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }

  return await axios.get(url, config)
}

export const addItemToFavorites = (favorites, itemToAddId) => {
  // check if there is such item in the cart
  const existingFavItem = favorites.find(
    favItemId => favItemId === itemToAddId
  )

  if (existingFavItem) return

  return [...favorites, itemToAddId]
}

export const removeItemFromFavorites = (favorites, itemToRemoveId) => {
  // check if there is such item in the cart
  const existingFavItem = favorites.find(
    favItemId => favItemId === itemToRemoveId
  )

  if (!existingFavItem) return

  return favorites.filter(favItemId => favItemId !== itemToRemoveId)
}
