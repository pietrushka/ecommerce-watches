import axios from 'axios'
import Cookies from 'js-cookie'

const { CMS_URL } = process.env

export const putFavoritesOnDB = async (favorites) => {
  const token = Cookies.get('token')
  const url = `${CMS_URL}/users/updateMe`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.put(url, { favorites }, config)
}

export const getFavoritesFromDB = async () => {
  const token = Cookies.get('token')
  if (!token) return
  const url = `${CMS_URL}/users/getMyFavorites`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
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
