import { Router } from 'express'
import {
  deleteAnnouncement,
  getAnnouncements,
  getSingleAnnouncement,
  postAnnouncement,
  updateAnnouncement,
} from '../../controllers/Home/announcements.controllers.mjs'
import { check } from 'express-validator'
import { profanityFilter } from '../../middleware/profanityFilter.mjs'

const router = Router()

const validate = () => [
  check('date').notEmpty(),
  check('time').notEmpty(),
  check('title').notEmpty().isLength({ min: 3, max: 40 }).custom(profanityFilter),
  check('description').isLength({ max: 250 }).custom(profanityFilter),
]

router.post(
  '/',
  validate(),
  postAnnouncement
)

router.get('/', getAnnouncements)

router.get('/:announcementId', getSingleAnnouncement)

router.patch(
  '/:announcementId',
  validate(),
  updateAnnouncement
)

router.delete('/:announcementId', deleteAnnouncement)

export default router
