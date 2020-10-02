const MongoClient = require('mongodb').MongoClient
let cachedDB = null

export const connectToDatabase = async () => {
  if (cachedDB) {
    console.log('use existing connection')
    return Promise.resolve(cachedDB)
  } else {
    return MongoClient.connect(process.env.MONGODB_URI, {
      native_parser: true,
      useUnifiedTopology: true
    })
      .then((client) => {
        const db = client.db('ecommerce-watches-db')
        console.log('New db connection')
        cachedDB = db
        return cachedDB
      }).catch((error) => {
        console.log('Mongo connection error')
        console.log(error)
      })
  }
}
