import { Router } from 'express'
import { check } from 'express-validator'
import fileUpload from '../../middleware/file-upload.mjs'
import { postLocation } from '../../controllers/About/location.controllers.mjs'

const router = Router()

router.post('/', fileUpload.single('image'), [
  check('title').notEmpty().isLength({ min: 5, max: 50 }),
  check('address').notEmpty(),
  check('image').notEmpty(),
  check('map').notEmpty(),
  check('direction').notEmpty(),
], postLocation)

export default router
