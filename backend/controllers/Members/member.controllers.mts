import { Request, Response, NextFunction } from 'express'
import Member from '../../models/About/member.model.mjs'
import { validationResult } from 'express-validator'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { MemberType } from '../../types.js'

export const createMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new HttpError(400, 'Invalid inputs passed')
    return next(error)
  }

  const { name, role, category, bio, contact, isAuthor } = req.body

  const newMember = new Member({
    name,
    role,
    category,
    image: req.file?.path,
    bio,
    contact,
    isAuthor,
  })

  try {
    await newMember.save()
  } catch (err) {
    const error = new HttpError(
      400,
      'Something went wrong, please try again later or contact your system administrator'
    )
    return next(error)
  }

  res.status(200).json({ member: newMember.toObject({ getters: true }) })
}

export const getAllMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let members: MemberType[]

  try {
    members = await Member.find()
  } catch (err) {
    const error = new HttpError(
      400,
      'Something went wrong, please try again later or contact your system administrator'
    )
    return next(error)
  }

  if (!members) {
    const error = new HttpError(404, 'No staff found in the database')
    return next(error)
  }

  const filterAndObjectify = (
    criteria: 'pastors' | 'leadership team' | 'ministry leaders'
  ) => {
    return members
      .filter(m => m.category === criteria)
      .map(m => m.toObject({ getters: true }))
  }

  const pastors = filterAndObjectify('pastors')
  const leadership = filterAndObjectify('leadership team')
  const ministryLeaders = filterAndObjectify('ministry leaders')

  res.status(200).json({ pastors, leadership, ministryLeaders })
}

export const getSingleMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { memberId } = req.params

  let existingMember: MemberType

  try {
    existingMember = (await Member.findById(memberId)) as MemberType
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, please try again later or contact your system administrator'
    )
    return next(error)
  }

  if (!existingMember) {
    const error = new HttpError(404, 'No member with this id found')
    return next(error)
  }

  res.status(200).json({ member: existingMember.toObject({ getters: true }) })
}

export const deleteMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { memberId } = req.params

  try {
    await Member.findByIdAndDelete(memberId)
  } catch (err) {
    const error = new HttpError(400, 'Member deletion failed, please try again later')
    return next(error)
  }

  res.status(200).json({message: 'Member successfully deleted'})
}
