import axios from 'axios'

const { API_URL } = process.env

export async function placeOrder (requestBody) {
  return new Promise((resolve, reject) => {
    const url = `${API_URL}/orders`
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post(url, JSON.stringify(requestBody), config)
      .then((res) => {
        resolve({ orderId: res.data.id, paymentMethod: res.data.methods.payment })
      })
      .catch((error) => {
        // reject the promise and pass the error object back to the form
        reject(error)
      })
  })
}
