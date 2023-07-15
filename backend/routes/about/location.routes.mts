import { Router } from 'express'
import { check } from 'express-validator'
import fileUpload from '../../middleware/file-upload.mjs'
import {
  getLocation,
  postLocation,
  updateLocation,
} from '../../controllers/About/location.controllers.mjs'
import { profanityFilter } from '../../middleware/profanityFilter.mjs'

const router = Router()

const validate = () => [
  check('title').notEmpty().isLength({ max: 50 }).custom(profanityFilter),
  check('address').notEmpty().isLength({max: 100}).custom(profanityFilter),
  check('map').notEmpty(),
  check('directions').notEmpty().isLength({max: 200}).custom(profanityFilter),
]

router.post('/', fileUpload.single('image'), validate(), postLocation)

router.get('/', getLocation)

router.patch('/', fileUpload.single('image'), validate(), updateLocation)

export default router
