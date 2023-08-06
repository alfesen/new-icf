import { Router } from 'express'
import {
  getAllGroups,
  getSingleGroup,
  postGroup,
} from '../../controllers/ChurchLife/groups.controller.mjs'
import fileUpload from '../../middleware/file-upload.mjs'
// import { check } from 'express-validator'
// import { profanityFilter } from '../../middleware/profanityFilter.mjs'

const router = Router()

// const validate = () => [
//   check('name')
//     .notEmpty()
//     .isLength({ min: 3, max: 40 })
//     .custom(profanityFilter),
//   check('description').isLength({ max: 250 }).custom(profanityFilter),
// ]

router.post('/', fileUpload.single('image'), postGroup)

router.get('/', getAllGroups)

router.get('/:groupId', getSingleGroup)

export default router
