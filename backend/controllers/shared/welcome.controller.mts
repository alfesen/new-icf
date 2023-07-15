import { Request, Response, NextFunction } from 'express'
import { IWelcome } from '../../types'
import Welcome from '../../models/Home/welcome.model.mjs'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { findExistingData } from '../../hooks/findExistingData.mjs'
import { saveData } from '../../hooks/saveData.mjs'
import { validationResult } from 'express-validator'
import { validate } from '../../hooks/validate.mjs'

export const postWelcome = async (
  model: typeof Welcome,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return validate(errors, next)
  }

  const existingWelcomeData = await findExistingData(model, next)

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

  await saveData(createdWelcome, next)

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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return validate(errors, next)
  }

  const { title, content } = req.body

  const welcomeData = (await findExistingData(model, next)) as IWelcome

  if (!welcomeData) {
    const error = new HttpError(
      404,
      "Welcome data wasn't found in the database"
    )
    return next(error)
  }

  welcomeData.title = title
  welcomeData.content = content

  await saveData(welcomeData, next)

  res.status(200).json({ welcomeData: welcomeData.toObject({ getters: true }) })
}

export const getWelcome = async (
  model: typeof Welcome,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const welcomeData = (await findExistingData(model, next)) as IWelcome

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
  const welcomeData = (await findExistingData(model, next)) as IWelcome

  if (!welcomeData) {
    const error = new HttpError(404, 'Data was not found on the server')
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
