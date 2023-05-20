import { Schema, model } from 'mongoose'
import { ILocation } from '../../types'

const locationSchema = new Schema<ILocation>({
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

export default model<ILocation>('Location', locationSchema)
