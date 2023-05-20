import { convertString } from '../../../helpers/convertString'
import { TArticleSection } from '../../../types/SharedTypes'

const ArticleSection = ({ sectionTitle, content }: TArticleSection) => {
  return (
    <div>
      <h3>{sectionTitle}</h3>
      {convertString(content)}
    </div>
  )
}

export default ArticleSection
