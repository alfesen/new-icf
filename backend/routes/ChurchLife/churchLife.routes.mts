import { Router } from 'express'

import eventRoutes from './events.routes.mjs'
import groupRoutes from './groups.routes.mjs'

const router = Router()

router.use('/events', eventRoutes)
router.use('/groups', groupRoutes)

export default router
