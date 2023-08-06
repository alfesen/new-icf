import { Request, Response, NextFunction } from 'express'
import Member from '../../models/About/member.model.mjs'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { IMember } from '../../types.js'
import fs from 'fs'
import { findExistingData } from '../../hooks/findExistingData.mjs'
import { saveData } from '../../hooks/saveData.mjs'
import { validationResult } from 'express-validator'
import { convertAndSaveImage } from '../../hooks/convertAndSaveImage.mjs'
import { validate } from '../../hooks/validate.mjs'
import { categorizePreviews } from '../../hooks/categorizePreviews.mjs'

export const createMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return validate(errors, next)
  }
  const { name, role, category, bio, contact, isAuthor } = req.body

  const imageWebpPath = await convertAndSaveImage(req.file!.path, 400)

  const newMember = new Member({
    name,
    role,
    category,
    image: imageWebpPath,
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
  })) as IMember[]

  if (!members) {
    const error = new HttpError(404, 'No staff found in the database')
    return next(error)
  }

  const pastors = categorizePreviews(members, 'pastors')
  const leadership = categorizePreviews(members, 'leadership team')
  const ministryLeaders = categorizePreviews(members, 'ministry leaders')

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
  })) as IMember

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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return validate(errors, next)
  }

  const { memberId } = req.params

  const member = (await findExistingData(Member, next, {
    id: memberId,
  })) as IMember

  if (!member) {
    const error = new HttpError(404, 'No member with this id found')
    return next(error)
  }

  const { name, role, category, bio, contact, isAuthor } = req.body

  if (req.file) {
    fs.unlink(member.image, err => {
      console.log(err)
    })
    const imageWebpPath = await convertAndSaveImage(req.file.path, 400)
    member.image = imageWebpPath
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

  const member = (await findExistingData(Member, next, {
    id: memberId,
  })) as IMember

  if (!member) {
    const error = new HttpError(404, 'No member with this id found')
    return next(error)
  }

  try {
    fs.unlink(member.image, err => {
      console.log(err)
    })
    await member.deleteOne()
  } catch {
    const error = new HttpError(
      400,
      'Member deletion failed, please try again later'
    )
    return next(error)
  }

  res.status(200).json({ message: 'Member successfully deleted' })
}
