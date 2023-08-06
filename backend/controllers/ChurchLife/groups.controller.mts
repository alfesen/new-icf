import { startSession } from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import Group from '../../models/ChurchLife/group.model.mjs'
import Member from '../../models/About/member.model.mjs'
import { validationResult } from 'express-validator'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { convertAndSaveImage } from '../../hooks/convertAndSaveImage.mjs'
import { findExistingData } from '../../hooks/findExistingData.mjs'
import { IGroup, IMember } from '../../types'
import { validate } from '../../hooks/validate.mjs'
import { categorizePreviews } from '../../hooks/categorizePreviews.mjs'

export const postGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return validate(errors, next)

  const { name, description, category, leaders } = req.body as IGroup

  const existingGroup = await findExistingData(Group, next, {
    filter: {
      name,
    },
  })
  if (existingGroup) {
    const error = new HttpError(
      400,
      'There is already group or ministry with this name'
    )
    return next(error)
  }

  let imageWebpPath: string | undefined = undefined
  if (req.file) {
    imageWebpPath = await convertAndSaveImage(req.file.path, 600)
  }

  let members: IMember[] = []

  try {
    for (const leaderId of leaders) {
      const member = (await findExistingData(Member, next, {
        id: leaderId,
      })) as IMember
      members.push(member)
    }
  } catch {
    const error = new HttpError(
      404,
      'One or more members with a given id were not found'
    )
    return next(error)
  }

  const group = new Group({
    name,
    description,
    category,
    image: imageWebpPath,
  })

  try {
    const session = await startSession()
    session.startTransaction()
    for (const member of members) {
      member.groups.push(group.id)
      group.leaders.push(member.id)
      await member.save({ session })
      await group.save()
    }
    await session.commitTransaction()
  } catch {
    const error = new HttpError(500, 'Creating group failed, please try again.')
    return next(error)
  }

  res.status(200).json({ group: group.toObject({ getters: true }) })
}

export const getAllGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let groups: IGroup[]
  try {
    groups = (await findExistingData(Group, next, {
      array: true,
    })) as IGroup[]
  } catch {
    const error = new HttpError(500, 'Something went wrong, please try again.')
    return next(error)
  }

  if (!groups.length) {
    const error = new HttpError(404, 'No groups found on the server')
    return next(error)
  }

  const smallGroups = categorizePreviews(groups, 'small group')
  const ministries = categorizePreviews(groups, 'ministry')

  res.status(200).json({ smallGroups, ministries })
}
