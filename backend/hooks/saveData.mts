import { NextFunction } from 'express'
import { Document } from 'mongoose'
import { HttpError } from '../models/shared/HttpError.model.mjs'

export const saveData = async <T extends Document>(
  data: T,
  next: NextFunction
): Promise<void> => {
  try {
    await data.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, please try again or contact your system administrator'
    )
    return next(error)
  }
}
