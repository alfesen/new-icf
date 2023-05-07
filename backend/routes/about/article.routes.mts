import {Router} from 'express'
import { getPageArticle, postPageArticle, updatePageArticle } from '../../controllers/shared/article.controller.mjs'

const router = Router()

router.post('/', postPageArticle)
router.get('/:pagePath', getPageArticle)
router.patch('/:pagePath', updatePageArticle)
router.delete('/:articleId', postPageArticle)

export default router