import { Router } from 'express'
import {
  getPageArticle,
  postPageArticle,
  updatePageArticle,
  deletePageArticle,
} from '../../controllers/shared/article.controller.mjs'
import { check } from 'express-validator'

const router = Router()

const validate = () => [
  check('articleTitle').notEmpty().isLength({ max: 50 }),
  check('lead').notEmpty().isLength({ max: 250 }),
  check('sections.*.sectionTitle').notEmpty().isLength({ max: 50 }),
  check('sections.*.content').notEmpty(),
]

router.post('/:page', validate(), postPageArticle)
router.get('/:page', getPageArticle)
router.patch('/:page', validate(), updatePageArticle)
router.delete('/:page', deletePageArticle)

export default router
