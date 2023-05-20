export type THeader = {
  pageTitle: string
  pageSubtitle: string
  desktopImage: string
  mobileImage: string
} | null

export type SideNav = {
  links: string[]
  collectionTitle: string
  title?: string
}

export type TMemberHeader = {
  name: string
  image: string
  role: string
}