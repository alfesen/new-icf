import { Router } from 'express'
import {
  deleteGroup,
  getAllGroups,
  getSingleGroup,
  postGroup,
  updateGroup,
} from '../../controllers/ChurchLife/groups.controller.mjs'
import fileUpload from '../../middleware/file-upload.mjs'
import { check } from 'express-validator'
import { profanityFilter } from '../../middleware/profanityFilter.mjs'

const router = Router()

const validate = () => [
  check('name').notEmpty().custom(profanityFilter),
  check('description').custom(profanityFilter),
  check('category').notEmpty(),
  check('leaders').notEmpty(),
]

router.post('/', fileUpload.single('image'), validate(), postGroup)

router.get('/', getAllGroups)

router.get('/:groupId', getSingleGroup)

router.patch('/:groupId', fileUpload.single('image'), validate(), updateGroup)

router.delete('/:groupId', deleteGroup)

export default router
