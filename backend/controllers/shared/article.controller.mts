import { NextFunction, Request, Response } from 'express'
import { validation } from '../../hooks/validation.mjs'
import Article from '../../models/shared/Article.mjs'
import { findExistingData } from '../../hooks/findExistingData.mjs'
import { ArticleType } from '../../types.js'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { saveData } from '../../hooks/saveData.mjs'

export const postPageArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)
  const { articleTitle, pagePath, sections } = req.body

  const existingArticle = (await findExistingData(Article, next, {
    filter: { pagePath },
  })) as ArticleType

  const newArticle = new Article({
    articleTitle: articleTitle,
    pagePath: pagePath,
    sections: sections,
  })

  if (existingArticle) {
    const error = new HttpError(
      400,
      'Article already exists, please edit existing article'
    )
    return next(error)
  }

  await saveData(newArticle, next)

  res.status(200).json({ article: newArticle.toObject({ getters: true }) })
}

export const getPageArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pagePath } = req.params
  const article = (await findExistingData(Article, next, {
    filter: { pagePath },
  })) as ArticleType

  if (!article) {
    const error = new HttpError(404, 'No article found for this page')
    return next(error)
  }

  res.status(200).json({ article: article.toObject({ getters: true }) })
}

export const updatePageArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)

  const { pagePath } = req.params
  const { articleTitle, sections } = req.body
  const article = (await findExistingData(Article, next, {
    filter: { pagePath },
  })) as ArticleType

  article.articleTitle = articleTitle
  article.sections = sections

  await saveData(article, next)

  res.status(200).json({ article: article.toObject({ getters: true }) })
}

export const deletePageArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { articleId } = req.params

  try {
    await Article.findByIdAndDelete(articleId)
  } catch (err) {
    const error = new HttpError(
      500,
      'Deleting article failed, please try again later or contact your system administrator'
    )
    return next(error)
  }
  
  res.status(200).json({message: 'Article deleted successfully'})
}
