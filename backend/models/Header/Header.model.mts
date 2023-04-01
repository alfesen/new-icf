import { model, Schema } from 'mongoose'

const headerSchema = new Schema({
  pagePath: {
    type: String,
    required: true,
  },
  pageTitle: {
    type: String,
    required: true,
  },
  pageSubtitle: {
    type: String,
    required: false,
  },
  desktopImage: {
    type: String,
    required: true,
  },
  mobileImage: {
    type: String,
    required: true,
  },
})

export default model('Header', headerSchema)
