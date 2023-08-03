import { Schema, model, Types } from 'mongoose'
import { IGroup } from '../../types'

const groupSchema = new Schema<IGroup>({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  leaders: {
    type: [
      {
        type: Types.ObjectId,
        ref: 'member',
      },
    ],
  },
})

export default model<IGroup>('Group', groupSchema)
