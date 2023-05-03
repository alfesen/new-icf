import { Request, Response, NextFunction } from 'express'
import { HttpError } from '../../models/shared/HttpError.model.mjs'
import Header from '../../models/Layout/header.model.mjs'
import { HeaderData, MulterFiles } from '../../types.js'
import fs from 'fs'
import { validation } from '../../hooks/validation.mjs'

const findExistingHeaderData = async (
  req: Request,
  next: NextFunction
): Promise<HeaderData | void> => {
  const { pageId } = req.params

  let headerData: HeaderData

  try {
    headerData = (await Header.findOne({
      pagePath: pageId,
    })) as HeaderData
  } catch (err) {
    const error = new HttpError(404, 'Header data not found on the server')
    return next(error)
  }
  
  return headerData
}

const saveHeaderData = async (
  data: HeaderData,
  next: NextFunction
): Promise<void> => {
  try {
    await data.save()
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, please try again later'
    )
    return next(error)
  }
}

export const postHeaderData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validation(req, next)

  const { pagePath, pageTitle, pageSubtitle } = req.body
  const { desktopImage, mobileImage } = req.files as MulterFiles

  const existingHeader = await findExistingHeaderData(req, next)

  if (existingHeader) {
    const error = new HttpError(400, 'Header for this page already exists')
    return next(error)
  }

  const createdHeaderData = new Header({
    pagePath: pagePath.replaceAll('/', ''),
    pageTitle,
    pageSubtitle,
    desktopImage: desktopImage[0].path,
    mobileImage: mobileImage[0].path,
  })

  await saveHeaderData(createdHeaderData, next)

  res
    .status(200)
    .json({ headerData: createdHeaderData.toObject({ getters: true }) })
}

export const getHeaderData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerData = await findExistingHeaderData(req, next)

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
  validation(req, next)

  const { pageTitle, pageSubtitle } = req.body

  const headerData = await findExistingHeaderData(req, next)

  if (!headerData) {
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

  await saveHeaderData(headerData, next)

  res.status(200).json({ headerData: headerData.toObject({ getters: true }) })
}
