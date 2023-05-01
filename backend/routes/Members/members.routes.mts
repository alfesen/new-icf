import {Router} from 'express'
import { createMember, deleteMember, getAllMembers, getSingleMember } from '../../controllers/Members/member.controllers.mjs'

const router = Router()

router.post('/', createMember)

router.get('/', getAllMembers)

router.get('/:memberId', getSingleMember)

router.delete('/:memberId', deleteMember)

export default router