import { Router } from 'express'
import {
  deleteHomeWelcome,
  getHomeWelcome,
  postHomeWelcome,
  updateHomeWelcome,
} from '../controllers/Home/home.controllers.mjs'
import { check } from 'express-validator'
import {
  getAnnouncements,
  postAnnouncement,
  updateAnnouncement,
} from '../controllers/Home/announcements.controllers.mjs'

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

router.post(
  '/announcements',
  [
    check('date').notEmpty(),
    check('time').notEmpty(),
    check('title').notEmpty().isLength({ min: 3, max: 40 }),
    check('description').isLength({ max: 250 }),
  ],
  postAnnouncement
)

router.get('/announcements', getAnnouncements)

router.patch(
  '/announcements/:announcementId',
  [
    check('date').notEmpty(),
    check('time').notEmpty(),
    check('title').notEmpty().isLength({ min: 3, max: 40 }),
  ],
  updateAnnouncement
)

export default router
