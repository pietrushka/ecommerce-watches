const stripe = require('stripe')(process.env.STRIPE_KEY)
const axios = require('axios')

const { API_URL } = process.env

export default async (req, res) => {
  const { items, methods, personalData, user } = req.body

  const dataFromCMS = {}

  const getProducts = async () => {
    const { data } = await axios(`${API_URL}/watches`)
    return { products: data }
  }
  const getShippingOpitons = async () => {
    const { data } = await axios(`${API_URL}/shipping-options`)
    return { shippingOpitons: data }
  }
  const getPaymentOpitons = async () => {
    const { data } = await axios(`${API_URL}/payment-options`)
    return { paymentOpitons: data }
  }

  // fetch data required for validation at once and save them in object
  await Promise.all([getProducts(), getShippingOpitons(), getPaymentOpitons()]).then((values) => {
    values.map(value => {
      dataFromCMS[Object.keys(value)[0]] = Object.values(value)[0]
    })
  })

  // const validateUserOrderData = () => {

  // }

  // send order to CMS

  // create relation between user and order

  // Prepare payment
  // const session = await stripe.checkout.sessions.create({
  //   success_url: `${process.env.API_URL}/success`,
  //   cancel_url: `${process.env.API_URL}/cancel`,
  //   payment_method_types: ['card, p24'],

  //   mode: 'payment'
  // })

  // if correct change payment status to paid

  res.statusCode = 200
  res.json({ message: 'zwromtka' })
}
