import { Router } from 'express'
import {
  getPageArticle,
  postPageArticle,
  updatePageArticle,
  deletePageArticle,
} from '../../controllers/shared/article.controller.mjs'
import { check } from 'express-validator'
import { profanityFilter } from '../../middleware/profanityFilter.mjs'

const router = Router()

const validate = () => [
  check('articleTitle').notEmpty().isLength({ max: 50 }).custom(profanityFilter),
  check('lead').notEmpty().isLength({ max: 250 }).custom(profanityFilter),
  check('sections.*.sectionTitle').notEmpty().isLength({ max: 50 }).custom(profanityFilter),
  check('sections.*.content').notEmpty().custom(profanityFilter),
]

router.post('/:page', validate(), postPageArticle)
router.get('/:page', getPageArticle)
router.patch('/:page', validate(), updatePageArticle)
router.delete('/:page', deletePageArticle)

export default router
