import { Document } from "mongoose"

export type MulterFiles = {
  [fieldname: string]: Express.Multer.File[]
}

export interface HeaderData extends Document  {
  pagePath: string
  pageTitle: string
  pageSubtitle: string
  desktopImage: string
  mobileImage: string
}

export interface WelcomeType extends Document  {
  title: string,
  content: string
}

export interface AnnouncementType extends Document {
  date: string,
  time: string
  title: string
  description?: string
}