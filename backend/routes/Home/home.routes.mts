import { Router } from 'express'

import welcomeRoutes from './welcome.routes.mjs'
import announcementsRoutes from './announcements.routes.mjs'

const router = Router()
router.use('/', welcomeRoutes)
router.use('/announcements', announcementsRoutes)

export default router
