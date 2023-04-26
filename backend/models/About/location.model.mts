import { Schema, model } from 'mongoose'

const locationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
})

export default model('Location', locationSchema)
