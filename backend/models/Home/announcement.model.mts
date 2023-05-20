import { Schema, model } from 'mongoose'
import { IAnnouncement } from '../../types'

const announcementSchema = new Schema<IAnnouncement>({
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

export default model<IAnnouncement>('Announcement', announcementSchema)
