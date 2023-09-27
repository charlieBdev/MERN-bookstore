import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express()

// Middleware for parsing request.body
app.use(express.json())

// Middleware efor handling CORS
// Option 1 - Allows all origins with default of cors(*)
// app.use(cors())
// Option 2 - Allow custom origins
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))

app.get('/', (request, response) => {
  console.log(request)
  return response.status(200).send('Welcome to the MERN Bookstore')
})

app.use('/api/books', booksRoute)

// ALL: Not found (I added)
app.all("*", (_, res) => {
  res.status(404).send({ msg: 'Not found' })
})

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error);
  })