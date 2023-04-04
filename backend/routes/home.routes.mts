import { Router } from 'express'
import { postHomeWelcome } from '../controllers/home.controllers.mjs'
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

export default router
