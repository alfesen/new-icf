import { Schema, model } from 'mongoose'
import { IWelcome } from '../../types'

const welcomeSchema = new Schema<IWelcome>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

export default model<IWelcome>('Welcome', welcomeSchema)
