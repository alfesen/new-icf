import { Router } from 'express'
import {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
} from '../../controllers/Members/member.controllers.mjs'
import { check } from 'express-validator'

const router = Router()

router.post(
  '/',
  [
    check('name')
      .notEmpty(),
    check('role')
      .isLength({ max: 50 }),
    check('category').custom((value) => {
      const categories = ['pastors', 'leadership team', 'ministry leaders'];
      if (!categories.includes(value)) {
        throw new Error('Unknown category.');
      }
    
      return true;
    }),
    check('bio').notEmpty(),
  ],
  createMember
)

router.get('/', getAllMembers)

router.get('/:memberId', getSingleMember)

router.delete('/:memberId', deleteMember)

router.patch(
  '/:memberId',
  [
    check('name')
      .notEmpty(),
    check('role')
      .isLength({ max: 50 }),
    check('category').custom((value) => {
      const categories = ['pastors', 'leadership team', 'ministry leaders'];
      if (!categories.includes(value)) {
        throw new Error('Unknown category.');
      }
    
      return true;
    }),
  ],
  updateMember
)

export default router
