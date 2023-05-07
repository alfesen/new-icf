import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import Announcement from '../../models/Home/announcement.model.mjs'
import { AnnouncementType } from '../../types.js'
import { findExistingData } from '../../hooks/findExistingData.mjs'
import { saveData } from '../../hooks/saveData.mjs'
import { validationResult } from 'express-validator'

export const postAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorField = errors.array()[0].param
    const error = new HttpError(
      400,
      `Invalid input in "${errorField}"-field passed, please check your data and try again"`
    )
    return next(error)
  }

  const { date, time, title, description } = req.body

  const newAnnouncement = new Announcement({
    date,
    time,
    title,
    description,
  }) as AnnouncementType

  await saveData(newAnnouncement, next)

  const existingAnnouncements = (await findExistingData(Announcement, next, {
    array: true,
  })) as AnnouncementType[]

  if (existingAnnouncements && existingAnnouncements.length > 30) {
    const sortedAnnouncement = existingAnnouncements.sort((an1, an2) => {
      return new Date(an1.date) < new Date(an2.date) ? 1 : -1
    })

    try {
      await sortedAnnouncement.at(-1)?.deleteOne()
    } catch (err) {
      const error = new HttpError(
        500,
        'Limiting data unsuccessful, please try again later or contact your system administrator'
      )
      return next(error)
    }
  }

  res
    .status(200)
    .json({ announcement: newAnnouncement.toObject({ getters: true }) })
}

export const getAnnouncements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const announcements = (await findExistingData(Announcement, next, {
    array: true,
  })) as AnnouncementType[]

  if (!announcements) {
    const error = new HttpError(404, 'No announcements found')
    return next(error)
  }

  const sortedAnnouncement = announcements.sort((an1, an2) => {
    return new Date(an1.date) > new Date(an2.date) ? 1 : -1
  })

  res.status(200).json({
    announcements: sortedAnnouncement
      .slice(-5)
      .reverse()
      .map(a => a.toObject({ getters: true })),
  })
}

export const getSingleAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { announcementId } = req.params
  const announcement = (await findExistingData(Announcement, next, {
    id: announcementId,
  })) as AnnouncementType

  res
    .status(200)
    .json({ announcement: announcement.toObject({ getters: true }) })
}

export const updateAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorField = errors.array()[0].param
    const error = new HttpError(
      400,
      `Invalid input in "${errorField}"-field passed, please check your data and try again"`
    )
    return next(error)
  }

  const { announcementId } = req.params
  const { title, date, time, description } = req.body

  const announcement = (await findExistingData(Announcement, next, {
    id: announcementId,
  })) as AnnouncementType

  announcement.title = title
  announcement.date = date
  announcement.time = time
  announcement.description = description

  await saveData(announcement, next)

  res
    .status(200)
    .json({ announcement: announcement.toObject({ getters: true }) })
}

export const deleteAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { announcementId } = req.params

  let existingAnnouncement: AnnouncementType

  try {
    existingAnnouncement = (await Announcement.findByIdAndRemove(
      announcementId
    )) as AnnouncementType
  } catch (err) {
    const error = new HttpError(
      404,
      "Announcement with a given ID wasn't found"
    )
    return next(error)
  }

  if (!existingAnnouncement) {
    const error = new HttpError(
      404,
      "Announcement with a given ID wasn't found"
    )
    return next(error)
  }

  res.status(500).json({ message: 'Announcement Removed' })
}
