import { Schema, model } from 'mongoose'

const welcomeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

export default model('AboutWelcome', welcomeSchema)