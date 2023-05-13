import ArticleForm from '../../../components/Forms/ArticleForm/ArticleForm'
import s from './EditArticle.module.scss'

const EditArticle = () => {
  return (
    <section className={s.new__article}>
      <h2>Edit Article</h2>
      <ArticleForm />
    </section>
  )
}

export default EditArticle
