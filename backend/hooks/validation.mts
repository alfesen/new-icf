import { NextFunction, Request } from 'express'
import { validationResult } from 'express-validator'
import { HttpError } from '../models/shared/HttpError.model.mjs'

export const validation = (req: Request, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorField = errors.array()[0].param
    const error = new HttpError(400, `Invalid input in "${errorField}"-field passed, please check your data and try again"`)
    return next(error)
  }
}
