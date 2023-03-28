import bodyParser from 'body-parser'
import express, { Request, Response, NextFunction } from 'express'
import { connect } from 'mongoose'

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@merncluster.c47z4pr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const app = express()

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

app.use(bodyParser.json())

connect(url)
  .then(() => {
    console.log('connected')
    app.listen(5000)
  })
  .catch(err => console.log(err))
