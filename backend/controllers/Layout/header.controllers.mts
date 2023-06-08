import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import Header from '../../models/Layout/header.model.mjs'
import { IHeader, MulterFiles } from '../../types.js'
import fs from 'fs'
import { findExistingData } from '../../hooks/findExistingData.mjs'
import { saveData } from '../../hooks/saveData.mjs'
import { validationResult } from 'express-validator'
import { convertAndSaveImage } from '../../hooks/convertAndSaveImage.mjs'

export const postHeaderData = async (
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

  const { pagePath, pageTitle, pageSubtitle } = req.body
  const { desktopImage, mobileImage } = req.files as MulterFiles

  const existingHeader = await findExistingData(Header, next, {
    filter: {
      pagePath: req.params.pageId,
    },
  })

  if (existingHeader) {
    const error = new HttpError(400, 'Header for this page already exists')
    return next(error)
  }

  const desktopImageWebpPath = await convertAndSaveImage(desktopImage[0].path)
  const mobileImageWebpPath = await convertAndSaveImage(mobileImage[0].path)

  const createdHeaderData = new Header({
    pagePath: pagePath.replaceAll('/', ''),
    pageTitle,
    pageSubtitle,
    desktopImage: desktopImageWebpPath,
    mobileImage: mobileImageWebpPath,
  })

  await saveData(createdHeaderData, next)

  res
    .status(200)
    .json({ headerData: createdHeaderData.toObject({ getters: true }) })
}

export const getHeaderData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerData = (await findExistingData(Header, next, {
    filter: {
      pagePath: req.params.pageId,
    },
  })) as IHeader

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
    const errorField = errors.array()[0].param
    const error = new HttpError(
      400,
      `Invalid input in "${errorField}"-field passed, please check your data and try again"`
    )
    return next(error)
  }

  const { pageTitle, pageSubtitle } = req.body

  const headerData = (await findExistingData(Header, next, {
    filter: {
      pagePath: req.params.pageId,
    },
  })) as IHeader

  if (!headerData) {
    const error = new HttpError(404, 'Header data not found on the server')
    return next(error)
  }

  headerData.pageTitle = pageTitle
  headerData.pageSubtitle = pageSubtitle

  if (req.files) {
    const files = req.files as MulterFiles
    if (files.desktopImage) {
      const desktopImageWebpPath = await convertAndSaveImage(
        files.desktopImage[0].path
      )
      fs.unlink(headerData.desktopImage, err => {
        console.log(err)
      })
      headerData.desktopImage = desktopImageWebpPath
    }
    if (files.mobileImage) {
      const mobileImageWebpPath = await convertAndSaveImage(
        files.mobileImage[0].path
      )
      fs.unlink(headerData.mobileImage, err => {
        console.log(err)
      })
      headerData.mobileImage = mobileImageWebpPath
    }
  }

  await saveData(headerData, next)

  res.status(200).json({ headerData: headerData.toObject({ getters: true }) })
}
