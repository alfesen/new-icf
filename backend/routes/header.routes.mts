import { Router } from 'express'
import { postHeaderData } from '../controllers/header.controllers.mjs'
import fileUpload from '../middleware/file-upload.mjs'

const router = Router()

router.post(
  '/:pageTitle/header',
  fileUpload.fields([{ name: 'desktopImage', maxCount: 1 }, { name: 'mobileImage', maxCount: 1 }]),
  postHeaderData
)

export default router
