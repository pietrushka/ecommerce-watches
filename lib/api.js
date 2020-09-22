import axios from 'axios'
const { API_URL } = process.env

export async function getAllWatches () {
  const { data } = await axios(`${API_URL}/watches`)
  return data
}

export async function getWatchesPaths () {
  const watches = await getAllWatches()

  const paths = watches.map((watch) => ({
    params: { id: watch.id.toString() }
  }))

  return paths
}

export async function getWatchById (id) {
  const { data } = await axios(`${API_URL}/watches/${id}`)
  return data
}

export async function getAllwShippingOptions () {
  const { data } = await axios(`${API_URL}/shipping-options`)
  return data
}
