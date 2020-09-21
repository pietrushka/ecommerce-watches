import fetch from 'isomorphic-unfetch'
const { API_URL } = process.env

export async function getAllWatches () {
  const res = await fetch(`${API_URL}/watches`)
  const data = await res.json()
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
  const res = await fetch(`${API_URL}/watches/${id}`)
  const watch = await res.json()
  return watch
}
