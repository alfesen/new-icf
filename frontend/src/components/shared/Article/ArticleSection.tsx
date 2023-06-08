import { useFormatText } from '../../../hooks/useFormatText'
import { TArticleSection } from '../../../types/SharedTypes'
import s from './ArticleSection.module.scss'

const ArticleSection = ({ sectionTitle, content }: TArticleSection) => {
  const { highlight } = useFormatText()
  return (
    <div className={s.section}>
      <h3 className={s.section__title}>{sectionTitle}</h3>
      {highlight(content, false, s.section__content)}
    </div>
  )
}

export default ArticleSection
