import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { HttpError } from '../models/shared/HttpError.model.mjs'
import Header from '../models/Header/Header.model.mjs'
import { HeaderData, MulterFiles } from '../types.js'
import fs from 'fs'

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

  const { pagePath, pageTitle, pageSubtitle } = req.body
  const { desktopImage, mobileImage } = req.files as MulterFiles

  const existingHeader = await Header.findOne({ pagePath: pagePath })
  if (existingHeader) {
    const error = new HttpError(400, 'Header for this page already exists')
    return next(error)
  }

  const createdHeaderData = new Header({
    pagePath,
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

export const getHeaderData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pageId } = req.params

  let headerData: HeaderData

  try {
    headerData = await Header.findOne({ pagePath: '/' + pageId }) as HeaderData
  } catch (err) {
    const error = new HttpError(404, 'Header data not found on the server')
    return next(error)
  }

  if (!headerData) {
    const error = new HttpError(404, 'Header data not found on the server')
    return next(error)
  }

  res.status(200).json({ headerData: headerData.toObject({ getters: true }) })
}

export const updateHeaderData = async (
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

  const { pageId } = req.params

  const { pageTitle, pageSubtitle } = req.body
  // const { desktopImage, mobileImage } = req.files as MulterFiles

  let headerData: HeaderData

  try {
    headerData = await Header.findOne({ pagePath: '/' + pageId }) as HeaderData
  } catch (err) {
    const error = new HttpError(404, 'Header data not found on the server')
    return next(error)
  }

  headerData.pageTitle = pageTitle
  headerData.pageSubtitle = pageSubtitle
  if (req.files) {
    const files = req.files as MulterFiles
    if (files.desktopImage) {
      fs.unlink(headerData.desktopImage, err => {
        console.log(err)
      })
      headerData.desktopImage = files.desktopImage[0].path
    }
    if (files.mobileImage) {
      fs.unlink(headerData.mobileImage, err => {
        console.log(err)
      })
      headerData.mobileImage = files.mobileImage[0].path
    }
  }

  try {
    await headerData.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, could not save data'
    )
    return next(error)
  }

  res.status(200).json({ headerData: headerData.toObject({ getters: true }) })
}
