import { Schema, Types, model } from 'mongoose'
import { IMember } from '../../types'

const memberSchema = new Schema<IMember>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String, required: true, default: 'Bio to be uploaded' },
  contact: { type: String, required: false },
  isAuthor: { type: Boolean, required: true, default: false },
  groups: { type: [{ type: Types.ObjectId, ref: 'Group' }], default: [] },
})

export default model<IMember>('Member', memberSchema)
