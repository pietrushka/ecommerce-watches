import axios from 'axios'
const { CMS_URL } = process.env

const addImageUrl = (item) => {
  const newItem = { ...item }
  newItem.imageUrl = item.cover.url.toString()
  return newItem
}

export async function getAllItems () {
  const { data } = await axios(`${CMS_URL}/watches`)
  const newData = data.map(item => addImageUrl(item))
  return newData
}

export async function getItemsPaths () {
  const items = await getAllItems()

  const paths = items.map((item) => ({
    params: { id: item.id.toString() }
  }))

  return paths
}

export async function getItemById (id) {
  const { data } = await axios(`${CMS_URL}/watches/${id}`)
  const newData = addImageUrl(data)
  return newData
}

export async function getAllShippingOptions () {
  const { data } = await axios(`${CMS_URL}/shipping-options`)
  return data
}

export async function getAllPaymentOptions () {
  const { data } = await axios(`${CMS_URL}/payment-options`)
  return data
}
