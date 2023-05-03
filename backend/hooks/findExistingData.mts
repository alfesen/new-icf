import { NextFunction } from 'express'
import { Document, Model } from 'mongoose'
import { HttpError } from '../models/shared/HttpError.model.mjs'
import { FindOptions } from '../types.js'

export const findExistingData = async <T extends Document>(
  model: Model<T>,
  next: NextFunction,
  options?: FindOptions<T>
): Promise<T | T[] | void> => {
  const { id, filter, array } = options ?? {}

  if (id) {
    let data: T
    try {
      data = (await model.findById(id)) as T
    } catch (err) {
      const error = new HttpError(404, `Data not found`)
      return next(error)
    }
    return data
  }

  if (filter) {
    let data: T
    try {
      data = (await model.findOne(filter)) as T
    } catch (err) {
      const error = new HttpError(404, `Data not found`)
      return next(error)
    }
    return data
  }

  if (array) {
    let data: T[]
    try {
      data = (await model.find()) as T[]
    } catch (err) {
      const error = new HttpError(404, `Data not found`)
      return next(error)
    }
    return data
  }

  let data: T

  try {
    data = (await model.findOne()) as T
  } catch (err) {
    const error = new HttpError(404, `Data not found`)
    return next(error)
  }

  return data
}
