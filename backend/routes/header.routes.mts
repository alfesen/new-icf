import { Router } from 'express'
import { getHeaderData, postHeaderData } from '../controllers/header.controllers.mjs'
import fileUpload from '../middleware/file-upload.mjs'
import { check } from 'express-validator'

const router = Router()

router.get('/:pageTitle/header', getHeaderData)

router.post(
  '/:pageTitle/header',
  fileUpload.fields([
    { name: 'desktopImage', maxCount: 1 },
    { name: 'mobileImage', maxCount: 1 },
  ]),
  [
    check('pageTitle').notEmpty().isLength({min: 3, max: 50}).withMessage('Page Title is required'),
    check('pageSubtitle').isLength({min: 3}).withMessage('Page Title is Required'),
  ],
  postHeaderData
)

export default router
