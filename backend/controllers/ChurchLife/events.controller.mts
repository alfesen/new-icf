import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { convertAndSaveImage } from '../../hooks/convertAndSaveImage.mjs'
import Event from '../../models/ChurchLife/event.model.mjs'
import fs from 'fs'
import { saveData } from '../../hooks/saveData.mjs'
import { findExistingData } from '../../hooks/findExistingData.mjs'
import { IEvent } from '../../types'
import { validate } from '../../hooks/validate.mjs'

export const postEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return validate(errors, next)
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

  const sortedEvents = events
    .sort((eventA, eventB) => (eventA.date < eventB.date ? 1 : -1))
    .map(e => e.toObject({ getters: true }))

  const previews = sortedEvents.map(({ id, image, title, date }) => {
    return { id, image, title, date }
  })

  res.status(200).json({ events: previews })
}

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params
  const event = (await findExistingData(Event, next, { id: eventId })) as IEvent

  if (!event) {
    const error = new HttpError(404, "Event wasn't found")
    return next(error)
  }

  res.status(200).json({ event: event.toObject({ getters: true }) })
}

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return validate(errors, next)
  }

  const { eventId } = req.params

  const { title, content, date, time } = req.body

  const event = (await findExistingData(Event, next, { id: eventId })) as IEvent
  if (!event) {
    const error = new HttpError(404, "Event wasn't found")
    return next(error)
  }

  if (req.file) {
    fs.unlink(event.image, err => console.log(err))
    const imageWebpPath = await convertAndSaveImage(req.file.path, 400)
    event.image = imageWebpPath
  }

  event.title = title
  event.content = content
  event.date = date
  event.time = time

  await saveData(event, next)

  res.status(200).json({ event: event.toObject({ getters: true }) })
}

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.params
  const event = (await findExistingData(Event, next, {
    id: eventId,
  })) as IEvent

  if (!event) {
    const error = new HttpError(404, 'No event with this id found')
    return next(error)
  }

  try {
    fs.unlink(event.image, err => {
      console.log(err)
    })
    await event.deleteOne()
  } catch {
    const error = new HttpError(
      400,
      'Event deletion failed, please try again later'
    )
    return next(error)
  }

  res.status(200).json({ message: 'Event successfully removed' })
}
