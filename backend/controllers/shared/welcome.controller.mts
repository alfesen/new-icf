import { Request, Response, NextFunction } from 'express'
import { WelcomeType } from '../../types'
import { validation } from '../../hooks/validation.mjs'
import Welcome from '../../models/Home/welcome.model.mjs'
import { HttpError } from '../../models/shared/HttpError.model.mjs'

export const postWelcome = async (
  model: typeof Welcome,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)

  let existingWelcomeData: WelcomeType

  try {
    existingWelcomeData = (await model.findOne()) as WelcomeType
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

  const createdWelcome = new model({
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

export const updateWelcome = async (
  model: typeof Welcome,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)

  const { title, content } = req.body

  let welcomeData: WelcomeType

  try {
    welcomeData = (await model.findOne()) as WelcomeType
  } catch (err) {
    const error = new HttpError(
      404,
      'No data for this section found, please try again later'
    )
    return next(error)
  }

  welcomeData.title = title
  welcomeData.content = content

  try {
    await welcomeData.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Updating section failed, please try again later or contact your system administrator'
    )
    return next(error)
  }

  res.status(200).json({ welcomeData: welcomeData.toObject({ getters: true }) })
}

export const getWelcome = async (
  model: typeof Welcome,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let welcomeData: WelcomeType

  try {
    welcomeData = (await model.findOne()) as WelcomeType
  } catch (err) {
    const error = new HttpError(404, 'No data found for this section')
    return next(error)
  }

  if (!welcomeData) {
    const error = new HttpError(404, 'Data was not found on the server')
    return next(error)
  }

  res.status(200).json({ welcomeData: welcomeData.toObject({ getters: true }) })
}

export const deleteWelcome = async (
  model: typeof Welcome,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let welcomeData: WelcomeType

  try {
    welcomeData = (await model.findOne()) as WelcomeType
  } catch (err) {
    const error = new HttpError(404, "There's nothing to remove ¯_(ツ)_/¯")
    return next(error)
  }

  try {
    await welcomeData.deleteOne()
  } catch (err) {
    const error = new HttpError(
      500,
      'Deleting unsuccessful, please try again later or contact your system administrator'
    )
    return next(error)
  }

  res.status(200).json({ message: 'Section removed successfully' })
}
