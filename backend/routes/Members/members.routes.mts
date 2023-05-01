import {Router} from 'express'
import { createMember, getAllMembers } from '../../controllers/Members/member.controllers.mjs'

const router = Router()

router.post('/', createMember)

router.get('/', getAllMembers)

export default router