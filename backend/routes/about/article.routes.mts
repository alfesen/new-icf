import { Router } from 'express'
import {
  getPageArticle,
  postPageArticle,
  updatePageArticle,
} from '../../controllers/shared/article.controller.mjs'
import { check } from 'express-validator'
import { deletePageArticle } from '../../controllers/shared/article.controller.mjs'

const router = Router()

const validate = () => [
  check('articleTitle').notEmpty().isLength({ max: 50 }),
  check('pagePath').notEmpty(),
  check('sections.*.sectionTitle').notEmpty().isLength({ max: 50 }),
  check('sections.*.content').notEmpty(),
]

router.post('/', validate(), postPageArticle)
router.get('/:pagePath', getPageArticle)
router.patch('/:pagePath', validate(), updatePageArticle)
router.delete('/:articleId', deletePageArticle)

export default router
