import {Router} from 'express'
import { createMember, getAllMembers, getSingleMember } from '../../controllers/Members/member.controllers.mjs'

const router = Router()

router.post('/', createMember)

router.get('/', getAllMembers)

router.get('/:memberId', getSingleMember)

export default router