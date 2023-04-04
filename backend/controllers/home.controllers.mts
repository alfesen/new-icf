import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpError } from '../models/shared/HttpError.model.mjs'
import Welcome from '../models/Home/welcome-home.mjs'

export const postHomeWelcome = async (
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

  let existingWelcomeData: any

  try {
    existingWelcomeData = await Welcome.find()
  } catch (err) {
    const error = new HttpError(401, "Data doesn't exist")
    return next(error)
  }

  if (existingWelcomeData) {
    const error = new HttpError(
      401,
      'Data already exists, update or delete it instead'
    )
    return next(error)
  }

  const { title, content } = req.body

  const createdWelcome = new Welcome({
    title,
    content,
  })

  try {
    await createdWelcome.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, please try again or contact administrator'
    )
    return next(error)
  }

  res
    .status(200)
    .json({ welcomeData: createdWelcome.toObject({ getters: true }) })
}
