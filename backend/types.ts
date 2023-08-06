import { Document } from 'mongoose'

export type MulterFiles = {
  [fieldname: string]: Express.Multer.File[]
}

export interface IHeader extends Document {
  pagePath: string
  pageTitle: string
  pageSubtitle: string
  desktopImage: string
  mobileImage: string
}

export interface IWelcome extends Document {
  title: string
  content: string
}

export interface IAnnouncement extends Document {
  date: string
  time: string
  title: string
  description?: string
}

export interface ILocation extends Document {
  title: string
  address: string
  location: string
  image: string
  directions: string
  map: string
}

export interface IMember extends Document {
  name: string
  role: string
  category: 'pastors' | 'leadership team' | 'ministry leaders'
  image: string
  bio: string
  isAdmin: boolean
  isAuthor: boolean
  contact?: string
  groups: IGroup[]
}

export type TMemberBasic = Pick<IMember, 'name' | 'image'> & { id: string }

export type FindOptions<T> = {
  id?: string
  filter?: any
  array?: boolean
}

export interface IArticleSection extends Document {
  sectionTitle: string
  content: string
}

export interface IArticle extends Document {
  articleTitle: string
  pagePath: string
  lead: string
  sections: IArticleSection[]
}

export interface IEvent extends Document {
  title: string
  content: string
  image: string
  date: string
  time: string
}

export interface IGroup extends Document {
  image?: string
  name: string
  description: string
  category: 'small group' | 'ministry'
  leaders: string[] & IMember[]
}
