import { Schema, model } from 'mongoose'
import { LocationType } from '../../types'

const locationSchema = new Schema<LocationType>({
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

export default model<LocationType>('Location', locationSchema)
