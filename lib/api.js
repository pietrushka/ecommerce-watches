import axios from 'axios'
const { API_URL } = process.env

const addImageUrl = (watch) => {
  const newWatch = { ...watch }
  newWatch.imageUrl = watch.cover.url.toString()
  return newWatch
}

export async function getAllWatches () {
  const { data } = await axios(`${API_URL}/watches`)
  const newData = data.map(watch => addImageUrl(watch))
  return newData
}

export async function getWatchesPaths () {
  const watches = await getAllWatches()

  const paths = watches.map((watch) => ({
    params: { id: watch.id.toString() }
  }))

  return paths
}

export async function getWatchByRef (id) {
  const { data } = await axios(`${API_URL}/watches/${id}`)
  const newData = addImageUrl(data)
  return newData
}

export async function getAllShippingOptions () {
  const { data } = await axios(`${API_URL}/shipping-options`)
  return data
}

export async function getAllPaymentOptions () {
  const { data } = await axios(`${API_URL}/payment-options`)
  return data
}
