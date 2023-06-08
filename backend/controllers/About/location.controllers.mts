import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import { ILocation } from '../../types.js'
import Location from '../../models/About/location.model.mjs'
import fs from 'fs'
import { findExistingData } from '../../hooks/findExistingData.mjs'
import { saveData } from '../../hooks/saveData.mjs'
import { validationResult } from 'express-validator'
import { convertAndSaveImage } from '../../hooks/convertAndSaveImage.mjs'

export const postLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorField = errors.array()[0].param
    const error = new HttpError(
      400,
      `Invalid input in "${errorField}"-field passed, please check your data and try again"`
    )
    return next(error)
  }

  const { title, address, directions, map } = req.body

  const existingLocation = (await findExistingData(Location, next)) as ILocation

  if (existingLocation) {
    const error = new HttpError(
      401,
      'Location is found in the database, please edit'
    )
    return next(error)
  }

  const locationWebpPath = await convertAndSaveImage(req.file!.path, 840)

  const location = new Location({
    title,
    address,
    directions,
    image: locationWebpPath,
    map,
  })

  await saveData(location, next)

  res.status(200).json({ location: location.toObject({ getters: true }) })
}

export const getLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const location = (await findExistingData(Location, next)) as ILocation

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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorField = errors.array()[0].param
    const error = new HttpError(
      400,
      `Invalid input in "${errorField}"-field passed, please check your data and try again"`
    )
    return next(error)
  }

  const { title, address, directions, map } = req.body

  const location = (await findExistingData(Location, next)) as ILocation

  if (!location) {
    const error = new HttpError(404, 'Location is not found in the database')
    return next(error)
  }

  if (req.file) {
    fs.unlink(location.image, err => {
      console.log(err)
    })
    const locationWebpPath = await convertAndSaveImage(req.file.path, 840)
    location.image = locationWebpPath
  }

  location.title = title
  location.address = address
  location.directions = directions
  location.map = map

  await saveData(location, next)

  res.status(200).json({ location: location.toObject({ getters: true }) })
}
