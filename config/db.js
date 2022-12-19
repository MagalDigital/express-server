const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected: ' + result.connection.host)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = { connectDB }
