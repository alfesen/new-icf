import { Request, Response, NextFunction } from 'express'
import Welcome from '../../models/Home/welcome.model.mjs'

import {
  deleteWelcome,
  getWelcome,
  postWelcome,
  updateWelcome,
} from '../shared/welcome.controller.mjs'

export const postHomeWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  postWelcome(Welcome, req, res, next)
}

export const getHomeWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getWelcome(Welcome, req, res, next)
}

export const updateHomeWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  updateWelcome(Welcome, req, res, next)
}

export const deleteHomeWelcome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  deleteWelcome(Welcome, req, res, next)
}
