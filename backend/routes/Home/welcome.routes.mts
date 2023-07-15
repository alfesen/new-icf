import { Router } from 'express'

import {
  deleteHomeWelcome,
  getHomeWelcome,
  postHomeWelcome,
  updateHomeWelcome,
} from '../../controllers/Home/home.controllers.mjs'
import { check } from 'express-validator'
import { profanityFilter } from '../../middleware/profanityFilter.mjs'

const router = Router()

const validate = () => [
  check('title').notEmpty().isLength({ min: 5, max: 40 }).custom(profanityFilter),
  check('content').notEmpty().custom(profanityFilter),
]

router.post(
  '/',
  validate(),
  postHomeWelcome
)

router.get('/', getHomeWelcome)

router.patch(
  '/',
  validate(),
  updateHomeWelcome
)

router.delete('/', deleteHomeWelcome)

export default router