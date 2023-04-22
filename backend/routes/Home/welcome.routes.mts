import { Router } from 'express'

import {
  deleteHomeWelcome,
  getHomeWelcome,
  postHomeWelcome,
  updateHomeWelcome,
} from '../../controllers/Home/home.controllers.mjs'
import { check } from 'express-validator'

const router = Router()

router.post(
  '/',
  [
    check('title').notEmpty().isLength({ min: 5, max: 40 }),
    check('content').notEmpty(),
  ],
  postHomeWelcome
)

router.get('/', getHomeWelcome)

router.patch(
  '/',
  [
    check('title').notEmpty().isLength({ min: 5, max: 40 }),
    check('content').notEmpty(),
  ],
  updateHomeWelcome
)

router.delete('/', deleteHomeWelcome)

export default router