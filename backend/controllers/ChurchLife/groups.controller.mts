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
import fs from 'fs'

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

export const getSingleGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { groupId } = req.params

  let group: IGroup

  try {
    group = (await findExistingData(Group, next, { id: groupId })) as IGroup
  } catch {
    return next(new HttpError())
  }

  if (!group) {
    const error = new HttpError(
      404,
      'No group or ministry found with a given ID'
    )
    return next(error)
  }

  let leaders: IMember[] = []

  try {
    for (const leader of group.leaders) {
      leaders = [
        ...leaders,
        (await findExistingData(Member, next, { id: leader })) as IMember,
      ]
    }
  } catch {
    return next(new HttpError())
  }

  if (!leaders.length) {
    const error = new HttpError(404, 'No leaders found')
    return next(error)
  }

  const groupObject = group.toObject({ getters: true })
  const renderedGroup = {
    ...groupObject,
    leaders: leaders.map(({ id, name, image }) => {
      return { id, name, image }
    }),
  }

  res.status(200).json({
    group: renderedGroup,
  })
}

// ! Handle the rest of updated data

export const updateGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return validate(errors, next)

  const { groupId } = req.params
  const { name, category, description, leaders } = req.body

  let group: IGroup

  try {
    group = (await findExistingData(Group, next, {
      id: groupId,
    })) as IGroup
  } catch {
    return next(new HttpError())
  }

  if (!group)
    return next(
      new HttpError(404, 'No group or ministry found with a given ID')
    )

  let members: IMember[]

  try {
    members = (await findExistingData(Member, next, {
      array: true,
    })) as IMember[]
  } catch {
    return next(new HttpError())
  }

  if (!members) {
    const error = new HttpError(404, 'No members found with a given id')
    return next(error)
  }

  if (req.file && group.image) {
    fs.unlink(group.image, err => console.log(err))
    const imageWebpPath = await convertAndSaveImage(req.file.path, 600)
    group.image = imageWebpPath
  }
  if (!req.file) {
    group.image = undefined
  }

  group.name = name
  group.category = category
  group.description = description

  try {
    const session = await startSession()
    session.startTransaction()
    for (const member of members) {
      if (leaders.includes(member.id) && !member.groups.includes(group.id)) {
        member.groups.push(group.id)
        group.leaders.push(member.id)
      } else if (
        member.groups.includes(group.id) &&
        !leaders.includes(member.id)
      ) {
        group.leaders = group.leaders.filter(
          leader => leader.toString() !== member.id.toString()
        ) as any
        member.groups = member.groups.filter(
          gr => gr.toString() !== group.id.toString()
        )
      }
      await member.save({ session })
    }
    await group.save()
    session.commitTransaction()
  } catch (error) {
    if (error instanceof Error) {
      return next(new HttpError(500, error.message))
    }
  }

  res.status(200).json({ group: group.toObject({ getters: true }) })
}
