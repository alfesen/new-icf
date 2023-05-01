import {Router} from 'express'
import { createMember, getAllMembers, getSingleMember, updateMember } from '../../controllers/Members/member.controllers.mjs'

const router = Router()

router.post('/', createMember)

router.get('/', getAllMembers)

router.get('/:memberId', getSingleMember)

router.patch('/:memberId', updateMember)

export default router