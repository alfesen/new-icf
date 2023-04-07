import { Schema, model } from 'mongoose'

const announcementSchema = new Schema({
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
})

export default model('Announcement', announcementSchema)
