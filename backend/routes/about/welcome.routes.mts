import { Router } from 'express'
import {
  getAboutWelcome,
  postAboutWelcome,
  updateAboutWelcome,
} from '../../controllers/About/about-welcome.controllers.mjs'
import { check } from 'express-validator'

const router = Router()

const validate = () => [
  check('title').notEmpty().isLength({ min: 5, max: 40 }),
  check('content').notEmpty(),
]

router.post(
  '/',
  validate(),
  postAboutWelcome
)

router.get('/', getAboutWelcome)

router.patch(
  '/',
  validate(),
  updateAboutWelcome
)

export default router
