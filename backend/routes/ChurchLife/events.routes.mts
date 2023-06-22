import { Router } from 'express'
import { check } from 'express-validator'
import {
  getAllEvents,
  getEvent,
  postEvent,
} from '../../controllers/ChurchLife/events.controller.mjs'
import fileUpload from '../../middleware/file-upload.mjs'

const router = Router()

const validate = () => [
  check('date').notEmpty(),
  check('time').notEmpty(),
  check('title').notEmpty().isLength({ min: 3, max: 40 }),
  check('description').isLength({ max: 250 }),
]

router.post('/', fileUpload.single('image'), validate(), postEvent)

router.get('/', getAllEvents)

router.get('/:eventId', getEvent)

export default router
