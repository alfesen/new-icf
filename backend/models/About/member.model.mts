import { Schema, model } from 'mongoose'
import { MemberType } from '../../types'

const memberSchema = new Schema<MemberType>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String, required: true, default: 'Bio to be uploaded' },
  contact: { type: String, required: false },
  isAuthor: { type: Boolean, required: true, default: false },
})

export default model('Member', memberSchema)
