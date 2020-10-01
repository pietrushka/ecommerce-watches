import axios from 'axios'

const API_URL = process.env.API_URL

export async function placeOrder (requestBody) {
  const url = `${API_URL}/api/place-order`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return axios.post(url, requestBody, config)
}
