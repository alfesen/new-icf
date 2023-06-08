import { useForm, useFieldArray } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Form/Button/Button'
import s from './ArticleForm.module.scss'

const ArticleForm = () => {
  const { page, articleId } = useParams()
  const { sendRequest, error } = useFetchData()
  const url = articleId
    ? `http://localhost:5000/api/articles/${page}/${articleId}`
    : `http://localhost:5000/api/articles/${page}`
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    watch,
    formState: { defaultValues },
  } = useForm({
    defaultValues: () =>
      fetch(url)
        .then(res => res.json())
        .then(({ article }: any) =>
          article
            ? article
            : {
                articleTitle: '',
                lead: '',
                sections: [],
              }
        ),
  })
  const method = defaultValues?.id ? 'PATCH' : 'POST'

  const { fields, append, remove } = useFieldArray({
    name: 'sections',
    control,
  })
  const submitArticle = async () => {
    const newArticle = {
      articleTitle: watch('articleTitle'),
      lead: watch('lead'),
      sections: watch('sections'),
    }

    try {
      await sendRequest(url, method, JSON.stringify(newArticle), {
        'Content-Type': 'application/json',
      })
      if (!error) {
        navigate(-1)
      }
    } catch (err) {}
  }

  return (
    <form onSubmit={handleSubmit(submitArticle)}>
      <Input
        element='input'
        label='Article Title'
        name='articleTitle'
        control={control}
        placeholder='Enter article title '
        rules={{
          required: 'Article title is required',
          maxLength: {
            value: 50,
            message: 'Maximum length is 50 characters',
          },
        }}
      />
      <Input
        element='textarea'
        label='Article Lead'
        name='lead'
        control={control}
        placeholder='Provide the lead for your article'
        rules={{
          required: 'Article lead is required',
          maxLength: {
            value: 250,
            message: 'Maximum length is 250 characters',
          },
        }}
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
                  placeholder='Enter section title'
                  rules={{
                    required: 'Section title is required',
                    maxLength: {
                      value: 50,
                      message: 'Maximum length is 50 characters',
                    },
                  }}
                />
                <Input
                  element='editor'
                  label='Content'
                  name={`sections.${index}.content`}
                  control={control}
                  placeholder='Enter content'
                  rules={{
                    required: 'Section content is required',
                  }}
                />
              </div>
              {
                <div className={s.form__button}>
                  <Button reverse onClick={() => remove(index)}>
                    X
                  </Button>
                </div>
              }
            </div>
          )
        })}
      <div className={s.form__actions}>
        <Button
          reverse
          onClick={() =>
            append({
              sectionTitle: '',
              content: '',
            })
          }
          type='button'>
          Add section
        </Button>
        <hr />
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default ArticleForm
