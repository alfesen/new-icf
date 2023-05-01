import { Router } from 'express'
import { check } from 'express-validator'
import fileUpload from '../../middleware/file-upload.mjs'
import {
  getLocation,
  postLocation,
  updateLocation,
} from '../../controllers/About/location.controllers.mjs'

const router = Router()

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').notEmpty().isLength({ min: 5, max: 50 }),
    check('address').notEmpty(),
    check('map').notEmpty(),
    check('directions').notEmpty(),
  ],
  postLocation
)

router.get('/', getLocation)

router.patch(
  '/',
  fileUpload.single('image'),
  [
    check('title').notEmpty().isLength({ min: 5, max: 50 }),
    check('address').notEmpty(),
    check('map').notEmpty(),
    check('directions').notEmpty(),
  ],
  updateLocation
)

export default router
