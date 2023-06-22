import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { convertAndSaveImage } from '../../hooks/convertAndSaveImage.mjs'
import Event from '../../models/ChurchLife/event.model.mjs'
import { saveData } from '../../hooks/saveData.mjs'
import { findExistingData } from '../../hooks/findExistingData.mjs'
import { IEvent } from '../../types'

export const postEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorField = errors.array()[0].param
    const error = new HttpError(
      400,
      `Invalid input in "${errorField}"-field passed, please check your data and try again`
    )
    return next(error)
  }

  const { title, content, date, time } = req.body

  const imageWebpPath = await convertAndSaveImage(req.file!.path, 400)

  const event = new Event({
    title,
    content,
    image: imageWebpPath,
    date,
    time,
  })

  await saveData(event, next)

  res.status(200).json({ event: event.toObject({ getters: true }) })
}

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const events = (await findExistingData(Event, next, {
    array: true,
  })) as IEvent[]

  if (!events || !events.length) {
    const error = new HttpError(404, 'No events found')
    return next(error)
  }

  res
    .status(200)
    .json({ events: events.map(e => e.toObject({ getters: true })) })
}
