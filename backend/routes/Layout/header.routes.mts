import { Router } from 'express'
import {
  getHeaderData,
  postHeaderData,
  updateHeaderData,
} from '../../controllers/Layout/header.controllers.mjs'
import fileUpload from '../../middleware/file-upload.mjs'
import { check } from 'express-validator'

const router = Router()

const validate = () => [
  check('pageTitle')
    .notEmpty()
    .isLength({ min: 3, max: 50 })
    .withMessage('Page Title is required'),
  check('pageSubtitle')
    .isLength({ min: 3 })
    .withMessage('Page Title is Required'),
]

router.get('/:pageId/header', getHeaderData)

router.post(
  '/:pageId/header',
  fileUpload.fields([
    { name: 'desktopImage', maxCount: 1 },
    { name: 'mobileImage', maxCount: 1 },
  ]),
  validate(),
  postHeaderData
)

router.patch(
  '/:pageId/header',
  fileUpload.fields([
    { name: 'desktopImage', maxCount: 1 },
    { name: 'mobileImage', maxCount: 1 },
  ]),
  validate(),
  updateHeaderData
)

export default router
