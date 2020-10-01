import axios from 'axios'

export async function placeOrder (requestBody) {
  const url = '/api/place-order'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return axios.post(url, requestBody, config)
}
