import { Router } from 'express'
import {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
} from '../../controllers/Members/member.controllers.mjs'
import { check } from 'express-validator'
import fileUpload from '../../middleware/file-upload.mjs'
import { profanityFilter } from '../../middleware/profanityFilter.mjs'

const router = Router()

const validate = () => [
  check('name').notEmpty().custom(profanityFilter),
  check('role').isLength({ max: 50 }).custom(profanityFilter),
  check('category').custom(value => {
    const categories = ['pastors', 'leadership team', 'ministry leaders']
    if (!categories.includes(value)) {
      throw new Error('Unknown category.')
    }

    return true
  }),
  check('bio').notEmpty().custom(profanityFilter),
]

router.post('/', fileUpload.single('image'), validate(), createMember)

router.get('/', getAllMembers)

router.get('/:memberId', getSingleMember)

router.delete('/:memberId', deleteMember)

router.patch(
  '/:memberId',
  fileUpload.single('image'),

  validate(),
  updateMember
)

export default router
