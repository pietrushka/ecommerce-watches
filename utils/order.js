import axios from 'axios'
import qs from 'qs'

const { API_URL } = process.env

// export async function placeOrder (requestBody) {
//   const url = `${API_URL}/orders`
//   const config = {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   }

//   return axios.post(url, (requestBody), config)
// }

export async function placeOrder (requestBody) {
  const url = 'http://localhost:3000/api/order'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return axios.post(url, requestBody, config)
}
