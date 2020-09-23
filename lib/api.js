import axios from 'axios'
const { API_URL } = process.env

const addApiUrlToImage = (watch) => {
  const newWatch = { ...watch }
  newWatch.imageUrl = `${API_URL}${watch.cover[0].url.toString()}`
  console.log({ newWatch })
  return newWatch
}

export async function getAllWatches () {
  const { data } = await axios(`${API_URL}/watches`)
  const newData = data.map(watch => addApiUrlToImage(watch))
  return newData
}

export async function getWatchesPaths () {
  const watches = await getAllWatches()

  const paths = watches.map((watch) => ({
    params: { refCode: watch.refCode.toString() }
  }))

  return paths
}

export async function getWatchByRef (refCode) {
  const { data } = await axios(`${API_URL}/watches/getByRefCode/${refCode}`)
  console.log('data from getByRef', data)
  const newData = addApiUrlToImage(data)
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
