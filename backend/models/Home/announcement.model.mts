import { Schema, model } from 'mongoose'
import { AnnouncementType } from '../../types'

const announcementSchema = new Schema<AnnouncementType>({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "No description provided"
  }
})

export default model<AnnouncementType>('Announcement', announcementSchema)
