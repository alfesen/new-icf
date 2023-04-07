import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import Welcome from '../../models/Home/welcome-home.mjs'
import { WelcomeType } from '../../types.js'
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

  let existingWelcomeData: WelcomeType

  try {
    existingWelcomeData = (await Welcome.findOne()) as WelcomeType
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

export const getHomeWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let homeWelcomeData: WelcomeType

  try {
    homeWelcomeData = (await Welcome.findOne()) as WelcomeType
  } catch (err) {
    const error = new HttpError(404, 'No data found for this section')
    return next(error)
  }

  if (!homeWelcomeData) {
    const error = new HttpError(404, 'Data was not found on the server')
    return next(error)
  }

  res
    .status(200)
    .json({ welcomeData: homeWelcomeData.toObject({ getters: true }) })
}

export const updateHomeWelcome = async (
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

  let homeWelcomeData: WelcomeType

  try {
    homeWelcomeData = (await Welcome.findOne()) as WelcomeType
  } catch (err) {
    const error = new HttpError(
      404,
      'No data for this section found, please try again later'
    )
    return next(error)
  }

  homeWelcomeData.title = title
  homeWelcomeData.content = content

  try {
    await homeWelcomeData.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Updating section failed, please try again later or contact your system administrator'
    )
    return next(error)
  }

  res
    .status(200)
    .json({ welcomeData: homeWelcomeData.toObject({ getters: true }) })
}

export const deleteHomeWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let homeWelcomeData: WelcomeType

  try {
    homeWelcomeData = (await Welcome.findOne()) as WelcomeType
  } catch (err) {
    const error = new HttpError(404, "There's nothing to remove ¯_(ツ)_/¯")
    return next(error)
  }

  try {
    await homeWelcomeData.deleteOne()
  } catch (err) {
    const error = new HttpError(
      500,
      'Deleting unsuccessful, please try again later or contact your system administrator'
    )
    return next(error)
  }

  res.status(200).json({ message: 'Section removed successfully' })
}
