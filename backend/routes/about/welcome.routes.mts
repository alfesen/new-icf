import { Router } from 'express'
import {
  getAboutWelcome,
  postAboutWelcome,
  updateAboutWelcome,
} from '../../controllers/About/about-welcome.controllers.mjs'
import { check } from 'express-validator'

const router = Router()

router.post(
  '/',
  [
    check('title').notEmpty().isLength({ min: 5, max: 40 }),
    check('content').notEmpty(),
  ],
  postAboutWelcome
)

router.get('/', getAboutWelcome)

router.patch(
  '/',
  [
    check('title').notEmpty().isLength({ min: 5, max: 40 }),
    check('content').notEmpty(),
  ],
  updateAboutWelcome
)

export default router
