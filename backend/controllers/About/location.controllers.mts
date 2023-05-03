import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { LocationType } from '../../types.js'
import Location from '../../models/About/location.model.mjs'
import fs from 'fs'
import { validation } from '../../hooks/validation.mjs'

const findExistingLocation = async (
  next: NextFunction
): Promise<LocationType | void> => {
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

  return location
}

const saveLocation = async (
  location: LocationType,
  next: NextFunction
): Promise<void> => {
  try {
    await location.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, please try again or contact your system administrator'
    )
    return next(error)
  }
}

export const postLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)

  const { title, address, directions, map } = req.body

  const existingLocation = await findExistingLocation(next)

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

  await saveLocation(location, next)

  res.status(200).json({ location: location.toObject({ getters: true }) })
}

export const getLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const location = await findExistingLocation(next)

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

  const location = await findExistingLocation(next)

  if (!location) {
    const error = new HttpError(404, 'Location is not found in the database')
    return next(error)
  }

  if (req.file) {
    fs.unlink(location.image, err => {
      console.log(err)
    })
    location.image = req.file.path
  }

  location.title = title
  location.address = address
  location.directions = directions
  location.map = map

  await saveLocation(location, next)

  res.status(200).json({ location: location.toObject({ getters: true }) })
}
