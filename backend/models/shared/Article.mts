import { Schema, model } from 'mongoose'
import { IArticle } from '../../types'

const articleSchema = new Schema<IArticle>({
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
        required: false,
      },
      content: {
        type: String,
        required: true,
      },
    }),
  ],
})

export default model<IArticle>('Article', articleSchema)
