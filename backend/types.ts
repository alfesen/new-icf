import { Document } from 'mongoose'

export type MulterFiles = {
  [fieldname: string]: Express.Multer.File[]
}

export interface HeaderData extends Document {
  pagePath: string
  pageTitle: string
  pageSubtitle: string
  desktopImage: string
  mobileImage: string
}

export interface WelcomeType extends Document {
  title: string
  content: string
}

export interface AnnouncementType extends Document {
  date: string
  time: string
  title: string
  description?: string
}

export interface LocationType extends Document {
  title: string
  address: string
  location: string
  image: string
  directions: string
  map: string
}

export interface MemberType extends Document {
  name: String
  role: String
  category: 'pastors' | 'leadership team' | 'ministry leaders'
  image: string
  bio: string
  isAdmin: boolean
  isAuthor: boolean
  contact?: string
}

export type FindOptions<T> = {
  id?: string
  filter?: any
  array?: boolean
}
