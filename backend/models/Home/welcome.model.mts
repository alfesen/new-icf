import { Schema, model } from 'mongoose'
import { WelcomeType } from '../../types'

const welcomeSchema = new Schema<WelcomeType>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

export default model<WelcomeType>('Welcome', welcomeSchema)
