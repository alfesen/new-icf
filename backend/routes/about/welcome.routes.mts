import { Router } from 'express'
import { postAboutWelcome } from '../../controllers/About/about-welcome.controllers.mjs'

const router = Router()

router.post('/', postAboutWelcome)

export default router
