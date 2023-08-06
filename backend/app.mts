import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import { connect } from 'mongoose'
import { HttpError } from './models/shared/HttpError.model.mjs'
import headerRoutes from './routes/Layout/header.routes.mjs'
import homeRoutes from './routes/Home/home.routes.mjs'
import aboutRoutes from './routes/About/about.routes.mjs'
import membersRoutes from './routes/Members/members.routes.mjs'
import articlesRoutes from './routes/Article/article.routes.mjs'
import churchLifeRoutes from './routes/ChurchLife/churchLife.routes.mjs'
import path from 'path'
import { MulterFiles } from './types.js'

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
app.use('/api/', headerRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/about', aboutRoutes)
app.use('/api/members', membersRoutes)
app.use('/api/articles', articlesRoutes)
app.use('/api/church-life', churchLifeRoutes)
app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err)
    })
  }
  if (req.files) {
    const files = req.files as MulterFiles
    for (let key in files) {
      fs.unlink(files[key][0].path, err => {
        console.log(err)
      })
    }
  }
  if (res.headersSent) {
    return next(error)
  }
  res.status(error.statusCode || 500)
  res.json({ message: error.message || 'Unhandled Server Error' })
})

connect(url)
  .then(() => {
    console.log('connected')
    app.listen(5000)
  })
  .catch(err => console.log(err))