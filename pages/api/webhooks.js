import { connectToDatabase } from './database'
const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  const db = await connectToDatabase()
  const collection = await db.collection('orders')

  const event = req.body

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const { orderId } = event.data.object.metadata
      await collection.update({ _id: ObjectId(orderId) }, { $set: { paymentStatus: 'paid' } })
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
