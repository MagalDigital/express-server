const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')

//connect .env file
require('dotenv').config({ path: `${__dirname}/.env` })

const { errorHandler } = require('./middleware/errorMiddleware')

const { connectDB } = require('./config/db')

connectDB()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//secutiry
app.use(
  cors({
    credentials: true,
  })
)
app.use(mongoSanitize()) //prevent noSQL injection
app.use(helmet()) //add secuirity headers
app.use(xss()) //prevent cross site scripting
app.use(hpp()) //prevent HTTP parameter pollution

//routes

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Running on: ' + PORT))
