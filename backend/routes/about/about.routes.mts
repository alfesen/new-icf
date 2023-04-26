import { Router } from 'express'
import welcomeRoutes from './welcome.routes.mjs'
import locationRoutes from './location.routes.mjs'

const router = Router()

router.use('/welcome', welcomeRoutes)
router.use('/locations', locationRoutes)

export default router
