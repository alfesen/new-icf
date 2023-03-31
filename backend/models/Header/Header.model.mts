import { model, Schema } from 'mongoose'

const headerSchema = new Schema({
  pageTitle: {
    type: String,
    required: true,
  },
  pageSubtitle: {
    type: String,
    required: false,
  },
  pageImage: {
    type: String,
    required: true,
  },
  mobileImage: {
    type: String,
    required: true,
  },
})

export default model('Header', headerSchema)
