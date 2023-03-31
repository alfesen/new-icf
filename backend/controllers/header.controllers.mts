import { Request, Response, NextFunction } from 'express'

export const postHeaderData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ message: 'done' })
}
