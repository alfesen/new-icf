import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { LocationType } from '../../types.js'
import Location from '../../models/About/location.model.mjs'
import fs from 'fs'
import { validation } from '../../hooks/validation.mjs'

export const postLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)

  const { title, address, directions, map } = req.body

  const existingLocation = (await Location.findOne()) as LocationType

  if (existingLocation) {
    const error = new HttpError(
      401,
      'Location is found in the database, please edit'
    )
    return next(error)
  }

  const location = new Location({
    title,
    address,
    directions,
    image: req.file?.path,
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

  if (!location) {
    const error = new HttpError(
      404,
      'No location found, please try again or contact your system administrator'
    )
    return next(error)
  }

  res.status(200).json({ location: location.toObject({ getters: true }) })
}

export const updateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)

  const { title, address, directions, map } = req.body

  const existingLocation = (await Location.findOne()) as LocationType

  if (!existingLocation) {
    const error = new HttpError(404, 'Location is not found in the database')
    return next(error)
  }

  if (req.file) {
    fs.unlink(existingLocation.image, err => {
      console.log(err)
    })
    existingLocation.image = req.file.path
  }

  existingLocation.title = title
  existingLocation.address = address
  existingLocation.directions = directions
  existingLocation.map = map

  try {
    await existingLocation.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Updating Location failed, please try again or contact your system administrator'
    )
    return next(error)
  }

  res
    .status(200)
    .json({ location: existingLocation.toObject({ getters: true }) })
}
