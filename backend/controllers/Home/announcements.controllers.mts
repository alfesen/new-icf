import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import Announcement from '../../models/Announcement/Announcement.model.mjs'
import { AnnouncementType } from '../../types.js'

export const postAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new HttpError(
      400,
      'Invalid inputs passed, please provide valid data'
    )
    return next(error)
  }

  const { date, time, title } = req.body

  const newAnnouncement = new Announcement({
    date, time, title
  }) as AnnouncementType

  try {
    await newAnnouncement.save()
  } catch (err) {
    const error = new HttpError(500, 'Failed to post the announcement, please try again later or contact your system administrator')
    return next(error)
  }

  res.status(200).json({announcement: newAnnouncement.toObject({getters: true})})
}
