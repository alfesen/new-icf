import { model, Schema } from 'mongoose'
import { HeaderData } from '../../types'

const headerSchema = new Schema<HeaderData>({
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

export default model<HeaderData>('Header', headerSchema)
