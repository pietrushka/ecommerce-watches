const axios = require('axios')

const { CMS_URL } = process.env

export default async (req, res) => {
  const event = req.body

  console.log(event.data)

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const { orderId } = event.data.object.metadata
      console.log('PaymentIntent was successful!', { orderId })
      // send order to CMS
      const orderReqConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const modifiedOrderResponse = await axios.put(`${CMS_URL}/orders/${orderId}`, { paymentStatus: 'paid' }, orderReqConfig)
      console.log(modifiedOrderResponse)
      break
    }
    // ... handle other event types
    default:
      // Unexpected event type
      return res.status(400).end()
  }

  // Return a 200 res to acknowledge receipt of the event
  res.json({ received: true })
}
