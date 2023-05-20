import { model, Schema } from 'mongoose'
import { IHeader } from '../../types'

const headerSchema = new Schema<IHeader>({
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

export default model<IHeader>('Header', headerSchema)
