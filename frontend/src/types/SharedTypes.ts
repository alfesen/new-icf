export type TWelcome = { route: string; subpage?: boolean }

export type TWelcomeData = {
  title: string
  content: string
} | null

export type TArticleSection = {
  sectionTitle: string
  content: string
  id: string
}

export type TArticle = {
  articleTitle: string
  id?: string
  pagePath?: string
  lead: string
  sections: TArticleSection[]
}
