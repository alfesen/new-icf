import { Router } from 'express'
import { getAboutWelcome, postAboutWelcome } from '../../controllers/About/about-welcome.controllers.mjs'

const router = Router()

router.post('/', postAboutWelcome)

router.get('/', getAboutWelcome)

export default router
