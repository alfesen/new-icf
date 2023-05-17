import { useForm, useFieldArray } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Form/Button/Button'
import s from './ArticleForm.module.scss'

const ArticleForm = () => {
  const { page, articleId } = useParams()
  const { sendRequest, error } = useFetchData()
  const navigate = useNavigate()
  const { control, handleSubmit, watch } = useForm({
    defaultValues:
      page && articleId
        ? async () =>
            fetch(`http://localhost:5000/api/articles/${page}/${articleId}`)
              .then(res => res.json())
              .then(({ article }: any) => article)
        : {
            articleTitle: '',
            sections: [
              {
                sectionTitle: '',
                content: '',
              },
            ],
          },
  })
  console.log(error)

  const { fields, append, remove } = useFieldArray({
    name: 'sections',
    control,
  })

  const submitArticle = async () => {
    const newArticle = {
      articleTitle: watch('articleTitle'),
      sections: watch('sections'),
    }

    if (articleId) {
      await sendRequest(
        `http://localhost:5000/api/articles/${page}/${articleId}`,
        'PATCH',
        JSON.stringify(newArticle),
        { 'Content-Type': 'application/json' }
      )
      if (!error) {
        return navigate(-1)
      }
    }
    await sendRequest(
      `http://localhost:5000/api/articles/${page}`,
      'POST',
      JSON.stringify(newArticle),
      { 'Content-Type': 'application/json' }
    )
    if (!error) {
      navigate(-1)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitArticle)}>
      <Input
        element='input'
        label='Page Title'
        name='articleTitle'
        control={control}
        placeholder='Enter article title '
      />
      {fields &&
        fields.map((field, index) => {
          return (
            <div key={field.id} className={s.form__controls}>
              <div className={s.form__control}>
                <Input
                  element='input'
                  label='Section Title'
                  name={`sections.${index}.sectionTitle`}
                  control={control}
                  placeholder='Enter section title '
                />
                <Input
                  element='textarea'
                  label='Content'
                  name={`sections.${index}.content`}
                  control={control}
                  placeholder='Enter content '
                />
              </div>
              {index > 0 && (
                <div className={s.form__button}>
                  <Button reverse onClick={() => remove(index)}>
                    X
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      <div>
        <Button
          onClick={() =>
            append({
              sectionTitle: '',
              content: '',
            })
          }
          type='button'>
          Add section
        </Button>
      </div>
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default ArticleForm
