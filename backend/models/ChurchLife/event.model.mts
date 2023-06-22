import { Schema, model } from 'mongoose'
import { IEvent } from '../../types'

const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
})

export default model<IEvent>('Event', eventSchema)
