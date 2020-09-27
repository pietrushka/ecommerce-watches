import axios from 'axios'
import Cookies from 'js-cookie'

const { API_URL } = process.env

export const putFavoritesOnDB = async (favorites) => {
  const token = Cookies.get('token')
  console.log('req body', favorites)
  const url = `${API_URL}/users/updateMe`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  console.log('saved favorites in db')
  return axios.put(url, { favorites }, config)
}

// export const getFavoritesFromDB = async () => {
//   const token = Cookies.get('token')
//   const url = `${API_URL}/users/updateMe`
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer  ${token}`
//     }
//   }

//   return axios.get(url, config)
// }

export const addItemToFavorites = (favorites, favItemToAdd) => {
  // check if there is such item in the cart
  const existingFavItem = favorites.find(
    favItem => favItem.id === favItemToAdd.id
  )

  if (existingFavItem) return

  return [...favorites, { ...favItemToAdd }]
}

export const removeItemFromFavorites = (favorites, favItemToRemove) => {
  // check if there is such item in the cart
  const existingFavItem = favorites.find(
    favItem => favItem.id === favItemToRemove.id
  )

  if (!existingFavItem) return

  return favorites.filter(favItem => favItem.id !== favItemToRemove.id)
}
