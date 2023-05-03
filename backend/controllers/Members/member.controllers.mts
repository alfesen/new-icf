import { Request, Response, NextFunction } from 'express'
import Member from '../../models/About/member.model.mjs'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { MemberType } from '../../types.js'
import fs from 'fs'
import { validation } from '../../hooks/validation.mjs'
import { findExistingData } from '../../hooks/findExistingData.mjs'
import { saveData } from '../../hooks/saveData.mjs'

export const createMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)
  const { name, role, category, bio, contact, isAuthor } = req.body

  const newMember = new Member({
    name,
    role,
    category,
    image: req.file?.path,
    bio,
    contact,
    isAuthor: !!isAuthor,
  })

  await saveData(newMember, next)

  res.status(200).json({ member: newMember.toObject({ getters: true }) })
}

export const getAllMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const members = (await findExistingData(Member, next, {
    array: true,
  })) as MemberType[]

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

  const existingMember = (await findExistingData(Member, next, {
    id: memberId,
  })) as MemberType

  if (!existingMember) {
    const error = new HttpError(404, 'No member with this id found')
    return next(error)
  }

  res.status(200).json({ member: existingMember.toObject({ getters: true }) })
}

export const updateMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)

  const { memberId } = req.params

  const member = (await findExistingData(Member, next, {
    id: memberId,
  })) as MemberType

  if (!member) {
    const error = new HttpError(404, 'No member with this id found')
    return next(error)
  }

  const { name, role, category, bio, contact, isAuthor } = req.body

  if (req.file) {
    fs.unlink(member.image, err => {
      console.log(err)
    })

    member.image = req.file.path
  }

  member.name = name
  member.role = role
  member.category = category
  member.bio = bio
  member.contact = contact
  member.isAuthor = isAuthor

  await saveData(member, next)

  res.status(200).json({ member: member.toObject({ getters: true }) })
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
    const error = new HttpError(
      400,
      'Member deletion failed, please try again later'
    )
    return next(error)
  }

  res.status(200).json({ message: 'Member successfully deleted' })
}
