import { Schema, model } from 'mongoose'

const articleSchema = new Schema({
  articleTitle: {
    type: String,
    required: true,
  },
  pagePath: {
    type: String,
    required: true,
  },
  sections: [
    new Schema({
      sectionTitle: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    }),
  ],
})

export default model('Article', articleSchema)
