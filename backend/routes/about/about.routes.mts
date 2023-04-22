import { Router } from 'express'
import welcomeRoutes from './welcome.routes.mjs'

const router = Router()

router.use('/welcome', welcomeRoutes)

export default router
