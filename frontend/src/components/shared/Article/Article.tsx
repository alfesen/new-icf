import { Fragment, useEffect, useState } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { TArticle } from '../../../types/SharedTypes'
import LoadingSpinner from '../../UI/UX/LoadingSpinner/LoadingSpinner'
import Button from '../../UI/Form/Button/Button'
import ArticleSection from './ArticleSection'
import s from './Article.module.scss'
import { convertString } from '../../../helpers/convertString'

const Article = ({ route }: { route: string }) => {
  const [article, setArticle] = useState<TArticle | null>(null)
  const { sendRequest, loading, error } = useFetchData()

  useEffect(() => {
    const getArticle = async () => {
      try {
        const { article } = await sendRequest(
          `http://localhost:5000/api/articles/${route}`
        )
        setArticle(article)
      } catch (err) {}
    }
    getArticle()
  }, [])

  const renderSections = article?.sections.map(
    ({ id, sectionTitle, content }) => {
      return (
        <ArticleSection
          key={`${sectionTitle}_${id}`}
          id={id}
          sectionTitle={sectionTitle}
          content={content}
        />
      )
    }
  )

  return (
    <Fragment>
      {loading && <LoadingSpinner />}
      {error && <h2>{error}</h2>}
      {!loading && !error && article && (
        <div className={s.article}>
          <h2 className={s.article__title}>{article.articleTitle}</h2>
          <div className={s.article__lead}>{convertString(article.lead)}</div>
          {renderSections}
        </div>
      )}
      <div className={s.article__actions}>
        <Button link to={`/edit-article/${route}`}>
          {!loading && !article
            ? 'Add article'
            : !error && !loading && article && 'Edit article'}
        </Button>
      </div>
    </Fragment>
  )
}

export default Article
