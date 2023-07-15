import { Router } from 'express'
import { check } from 'express-validator'
import {
  deleteEvent,
  getAllEvents,
  getEvent,
  postEvent,
  updateEvent,
} from '../../controllers/ChurchLife/events.controller.mjs'
import fileUpload from '../../middleware/file-upload.mjs'
import { profanityFilter } from '../../middleware/profanityFilter.mjs'

const router = Router()

const validate = () => [
  check('date').notEmpty(),
  check('time').notEmpty(),
  check('title').notEmpty().isLength({ min: 3, max: 40 }).custom(profanityFilter),
  check('description').isLength({ max: 250 }).custom(profanityFilter),
]

router.post('/', fileUpload.single('image'), validate(), postEvent)

router.get('/', getAllEvents)

router.get('/:eventId', getEvent)

router.patch('/:eventId', fileUpload.single('image'), validate(), updateEvent)

router.delete('/:eventId', deleteEvent)

export default router
