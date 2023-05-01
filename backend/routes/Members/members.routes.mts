import {Router} from 'express'
import { createMember, getAllMembers, getSingleMember, updateMember, deleteMember } from '../../controllers/Members/member.controllers.mjs'

const router = Router()

router.post('/', createMember)

router.get('/', getAllMembers)

router.get('/:memberId', getSingleMember)

router.delete('/:memberId', deleteMember)

router.patch('/:memberId', updateMember)

export default router