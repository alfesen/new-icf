import { convertString } from '../../../helpers/convertString'
import { TArticleSection } from '../../../types/SharedTypes'
import s from './ArticleSection.module.scss'

const ArticleSection = ({ sectionTitle, content }: TArticleSection) => {
  return (
    <div className={s.section}>
      <h3 className={s.section__title}>{sectionTitle}</h3>
      {convertString(content, false, s.section__content)}
    </div>
  )
}

export default ArticleSection
