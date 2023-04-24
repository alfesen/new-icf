import { Router } from 'express'
import { getAboutWelcome, postAboutWelcome, updateAboutWelcome } from '../../controllers/About/about-welcome.controllers.mjs'

const router = Router()

router.post('/', postAboutWelcome)

router.get('/', getAboutWelcome)

router.patch('/', updateAboutWelcome)

export default router
