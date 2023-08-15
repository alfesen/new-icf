import { useParams } from 'react-router-dom'
import ArticleForm from './../../components/Forms/ArticleForm/ArticleForm'
import s from './EditArticle.module.scss'
import { Helmet } from 'react-helmet'

const EditArticle = () => {
  const { articleId } = useParams()
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {`${
            articleId ? 'Edit' : 'Add'
          } Article - International Christian Fellowship of Warsaw`}
        </title>
        <link rel='canonical' href='#' />
      </Helmet>
      <section className={s.new__article}>
        <h2>{articleId ? 'Edit Article' : 'Add Article'}</h2>
        <ArticleForm />
      </section>
    </>
  )
}

export default EditArticle
