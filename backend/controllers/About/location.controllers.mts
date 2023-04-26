import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { LocationType, MulterFiles } from '../../types.js'
import Location from '../../models/About/location.model.mjs'

export const postLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new HttpError(400, 'Invalid inputs passed')
    return next(error)
  }

  const { title, address, directions, map } = req.body
  const { image } = req.files as MulterFiles

  let existingLocation: LocationType

  try {
    existingLocation = (await Location.findOne()) as LocationType
  } catch (err) {
    const error = new HttpError(
      404,
      'Location not found, proceed to add location'
    )
    return next(error)
  }

  if (existingLocation) {
    const error = new HttpError(
      404,
      'Location not found, proceed to add location'
    )
    return next(error)
  }

  const location = new Location({
    title,
    address,
    directions,
    image: image[0].path,
    map,
  })

  try {
    await location.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, please try again or contact your system administrator'
    )
    return next(error)
  }

  res.status(200).json({ location: location.toObject({ getters: true }) })
}

export const getLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let location: LocationType

  try {
    location = (await Location.findOne()) as LocationType
  } catch (err) {
    const error = new HttpError(
      404,
      'No location found, please try again or contact your system administrator'
    )
    return next(error)
  }

  res.status(200).json({ location: location.toObject({ getters: true }) })
}
