import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpError } from '../models/shared/HttpError.model.mjs'
import Header from '../models/Header/Header.model.mjs'
import { MulterFiles } from '../types.js'

export const postHeaderData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError(401, 'Invalid inputs passed, please check your data')
    )
  }

  const { path, pageTitle, pageSubtitle } = req.body
  const { desktopImage, mobileImage } = req.files as MulterFiles
  
  const existingHeader = await Header.findOne({pagePath: path})
  if(existingHeader) {
    const error = new HttpError(400, 'Header for this page already exists')
    return next(error)
  }

  const createdHeaderData = new Header({
    pagePath: path,
    pageTitle,
    pageSubtitle,
    desktopImage: desktopImage[0].path,
    mobileImage: mobileImage[0].path,
  })


  try {
    await createdHeaderData.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, please try again later'
    )
    return next(error)
  }

  res
    .status(200)
    .json({ headerData: createdHeaderData.toObject({ getters: true }) })
}
