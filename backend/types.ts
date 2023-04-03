export type MulterFiles = {
  [fieldname: string]: Express.Multer.File[]
}

export type HeaderData = {
  pagePath: string
  pageTitle: string
  pageSubtitle: string
  desktopImage: string
  mobileImage: string
} | null
