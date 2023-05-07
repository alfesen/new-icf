import { Schema, model } from 'mongoose'
import { ArticleType } from '../../types'

const articleSchema = new Schema<ArticleType>({
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

export default model<ArticleType>('Article', articleSchema)
