import { Router } from 'express'
import welcomeRoutes from './welcome.routes.mjs'
import locationRoutes from './location.routes.mjs'
import articleRoutes from './article.routes.mjs'

const router = Router()

router.use('/welcome', welcomeRoutes)
router.use('/location', locationRoutes)
router.use('/article', articleRoutes)

export default router
