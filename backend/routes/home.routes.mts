import { Router } from 'express'
import {
  deleteHomeWelcome,
  getHomeWelcome,
  postHomeWelcome,
  updateHomeWelcome,
} from '../controllers/Home/home.controllers.mjs'
import { check } from 'express-validator'
import { postAnnouncement } from '../controllers/Home/announcements.controllers.js'

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

router.post('/announcements', [
  check('data').notEmpty(),
  check('time').notEmpty(),
  check('title').notEmpty().isLength({min: 3, max: 40})
], postAnnouncement)

export default router
