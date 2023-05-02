import { Request, Response, NextFunction } from 'express'
import AboutWelcome from '../../models/About/about-welcome.model.mjs'
import {
  getWelcome,
  postWelcome,
  updateWelcome,
} from '../shared/welcome.controller.mjs'

export const postAboutWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  postWelcome(AboutWelcome, req, res, next)
}

export const getAboutWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getWelcome(AboutWelcome, req, res, next)
}

export const updateAboutWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  updateWelcome(AboutWelcome, req, res, next)
}
