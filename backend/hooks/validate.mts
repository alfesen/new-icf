import { NextFunction } from 'express'
import { HttpError } from '../models/shared/HttpError.model.mjs'
import { Result } from 'express-validator'

export const validate = (errors: Result, next: NextFunction) => {
  const { msg, param } = errors.array()[0]
  const error = new HttpError(400, `${param}: ${msg}`)
  return next(error)
}
