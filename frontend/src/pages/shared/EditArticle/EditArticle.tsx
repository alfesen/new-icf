import { useParams } from 'react-router-dom'
import ArticleForm from '../../../components/Forms/ArticleForm/ArticleForm'
import s from './EditArticle.module.scss'

const EditArticle = () => {
  const {articleId} = useParams()
  return (
    <section className={s.new__article}>
      <h2>{articleId ? 'Edit Article' : 'Add Article'}</h2>
      <ArticleForm />
    </section>
  )
}

export default EditArticle
