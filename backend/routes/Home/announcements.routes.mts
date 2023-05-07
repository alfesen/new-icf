import { Router } from 'express'
import {
  deleteAnnouncement,
  getAnnouncements,
  getSingleAnnouncement,
  postAnnouncement,
  updateAnnouncement,
} from '../../controllers/Home/announcements.controllers.mjs'
import { check } from 'express-validator'

const router = Router()

const validate = () => [
  check('date').notEmpty(),
  check('time').notEmpty(),
  check('title').notEmpty().isLength({ min: 3, max: 40 }),
  check('description').isLength({ max: 250 }),
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
