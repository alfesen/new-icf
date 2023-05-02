import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import Announcement from '../../models/Home/announcement.model.mjs'
import { AnnouncementType } from '../../types.js'
import { validation } from '../../hooks/validation.mjs'

export const postAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)

  const { date, time, title, description } = req.body

  const newAnnouncement = new Announcement({
    date,
    time,
    title,
    description,
  }) as AnnouncementType

  try {
    await newAnnouncement.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Failed to post the announcement, please try again later or contact your system administrator'
    )
    return next(error)
  }

  let existingAnnouncements: AnnouncementType[]

  try {
    existingAnnouncements = (await Announcement.find()) as AnnouncementType[]
  } catch (err) {
    const error = new HttpError(404, 'No announcements found')
    return next(error)
  }

  if (existingAnnouncements.length > 30) {
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
  let announcements: AnnouncementType[]

  try {
    announcements = await Announcement.find()
  } catch (err) {
    const error = new HttpError(404, 'No announcements found')
    return next(error)
  }

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
  let announcement: AnnouncementType

  try {
    announcement = (await Announcement.findById(
      announcementId
    )) as AnnouncementType
    console.log(announcement)
  } catch (err) {
    const error = new HttpError(404, "Announcement wasn't found")
    return next(error)
  }

  res
    .status(200)
    .json({ announcement: announcement.toObject({ getters: true }) })
}

export const updateAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)

  const { announcementId } = req.params
  const { title, date, time, description } = req.body

  let existingAnnouncement: AnnouncementType

  try {
    existingAnnouncement = (await Announcement.findById(
      announcementId
    )) as AnnouncementType
  } catch (err) {
    const error = new HttpError(404, 'No announcement with a given ID found')
    return next(error)
  }

  existingAnnouncement.title = title
  existingAnnouncement.date = date
  existingAnnouncement.time = time
  existingAnnouncement.description = description

  try {
    await existingAnnouncement.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Could not update the announcement, please try again later'
    )
    return next(error)
  }

  res
    .status(200)
    .json({ announcement: existingAnnouncement.toObject({ getters: true }) })
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
