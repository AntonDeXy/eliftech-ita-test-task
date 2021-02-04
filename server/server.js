const PORT = 5000 | process.env.PORT
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/routes')
const isAuth = require('./middlewares/isAuth')
const path = require('path')

const app = express()

const MONGO_USERNAME = 'admin'
const MONGO_PASSWORD = 'admin'
const MONGO_DBNAME = 'test'

app.use(morgan('tiny'))

app.use(isAuth)

app.use(express.json())

app.use(cors('*'))

app.use(express.static(path.join(__dirname, '../client/build')))

app.use('/api', routes)

mongoose.connect(
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.d5k0m.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    if (err) {
      throw new Error(err)
    }
    console.log('DB connected')
    app.listen(PORT, () => console.log("Server started"))
  } 
)
