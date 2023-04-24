import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import AboutWelcome from '../../models/About/about-welcome.model.mjs'
import { WelcomeType } from '../../types.js'

export const postAboutWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new HttpError(
      400,
      'Invalid inputs provided, please try again'
    )
    return next(error)
  }

  const { title, content } = req.body

  let existingWelcome: WelcomeType

  try {
    existingWelcome = (await AboutWelcome.findOne()) as WelcomeType
  } catch (err) {
    const error = new HttpError(401, "The data wasn't found on the server")
    return next(error)
  }

  if (existingWelcome) {
    const error = new HttpError(
      401,
      'The data already exists on the server, please edit or remove it'
    )
    return next(error)
  }

  const welcome = new AboutWelcome({
    title,
    content,
  })

  try {
    await welcome.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, please try again or contact your system administrator'
    )
    return next(error)
  }

  res.status(200).json({ welcome: welcome.toObject({ getters: true }) })
}

export const getAboutWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let welcome: WelcomeType

  try {
    welcome = (await AboutWelcome.findOne()) as WelcomeType
  } catch (err) {
    const error = new HttpError(404, 'No welcome text found for this page')
    return next(error)
  }

  if (!welcome) {
    const error = new HttpError(404, 'Data was not found on the server')
    return next(error)
  }

  res.status(200).json({ welcome: welcome.toObject({ getters: true }) })
}

export const updateAboutWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new HttpError(
      401,
      'Invalid inputs passed, please check your data'
    )
    return next(error)
  }

  const { title, content } = req.body

  let welcome: WelcomeType

  try {
    welcome = (await AboutWelcome.findOne()) as WelcomeType
  } catch (err) {
    const error = new HttpError(
      404,
      'No data for this section found, please try again later'
    )
    return next(error)
  }

  welcome.title = title
  welcome.content = content

  try {
    await welcome.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Updating section failed, please try again later or contact your system administrator'
    )
    return next(error)
  }

  res
    .status(200)
    .json({ welcome: welcome.toObject({ getters: true }) })
}