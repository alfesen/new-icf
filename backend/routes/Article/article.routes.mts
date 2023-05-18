import { Router } from 'express'
import pageArticleRoutes from './pageArticle.routes.mjs'

const router = Router()

router.use('/', pageArticleRoutes)

export default router
