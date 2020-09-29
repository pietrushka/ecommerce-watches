const stripe = require('stripe')(process.env.STRIPE_KEY)
const axios = require('axios')

const { API_URL } = process.env

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

export default async (req, res) => {
  const { items, methods, personalData, user, token } = req.body

  console.log({ items, methods, personalData, user, token })

  const dataFromCMS = {}
  let validatedOrder
  let orderId

  try {
    // fetch data required for validation at once and save them in object
    await Promise.all([getProducts(), getShippingOpitons(), getPaymentOpitons()]).then((values) => {
      values.map(value => {
        dataFromCMS[Object.keys(value)[0]] = Object.values(value)[0]
      })
    })

    // set order data
    const setOrderData = () => {
      const validatedItems = items.map(item => {
        const correspondingItemInCMS = dataFromCMS.products.find(product => product.id === item.id)

        if (correspondingItemInCMS.price !== item.price) console.log('Items data error', item)

        // if evertything is OK return item
        return item
      })

      const validatedPayment = dataFromCMS.paymentOpitons.find(option => option.name === methods.payment)
      const validatedShipping = dataFromCMS.shippingOpitons.find(option => option.name === methods.shipping)

      const validatedMethods = {
        payment: {
          id: validatedPayment.id,
          name: validatedPayment.name
        },
        shipping: {
          id: validatedShipping.id,
          name: validatedShipping.name,
          price: validatedShipping.price
        }
      }

      const validatedItemsValue = validatedItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity)
      }, 0)

      const validatedAmount = validatedItemsValue + validatedShipping.price

      return { items: validatedItems, methods: validatedMethods, personalData, amount: validatedAmount, paymentStatus: 'not-paid' }
    }

    validatedOrder = setOrderData()
    console.log(validatedOrder)

    // send order to CMS
    const orderReqConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const orderResponse = await axios.post(`${API_URL}/orders`, JSON.stringify(validatedOrder), orderReqConfig)
    orderId = orderResponse.data.id

    // create relation between user and order
    if (user.id) {
      const ordersUrl = `${API_URL}/users/getMyOrders`
      const authConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const userResponse = await axios.get(ordersUrl, authConfig)

      const userOrders = [...userResponse.data.orders, orderId]

      await axios.put(`${API_URL}/users/updateMe`, { orders: userOrders }, authConfig)
    }
  } catch (error) {
    console.log(error, error.response)
  }

  const lineItems = validatedOrder.items.map(product => {
    console.log(product.price)

    return {
      price_data: {
        product_data: {
          name: `${product.brand} ${product.model}`,
          description: product.refCode
        },
        unit_amount: product.price * 100,
        currency: 'usd'
      },
      quantity: product.quantity
    }
  })

  // addShipping to lineItems
  const { price: shippingPrice, id: shippingId, name: shippingName } = validatedOrder.methods.shipping
  console.log({ shippingPrice, shippingId, shippingName })
  lineItems.push({
    price_data: {
      product_data: {
        name: shippingName,
        description: shippingId
      },
      unit_amount: shippingPrice * 100,
      currency: 'usd'
    },
    quantity: 1
  })

  // Prepare payment
  const session = await stripe.checkout.sessions.create({
    success_url: `https://localhost:3000/success/orderId=${orderId}`,
    cancel_url: `https://localhost:3000/cancel/orderId=${orderId}`,
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    client_reference_id: user.id,
    customer_email: user.email,
    metadata: {
      orderId
    }
  })

  // if correct change payment status to paid
  res.json(session)
}
