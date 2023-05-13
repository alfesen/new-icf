import { useForm, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Form/Button/Button'
import s from './ArticleForm.module.scss'

const ArticleForm = () => {
  const { page } = useParams()
  const { control } = useForm({
    defaultValues: async () =>
      fetch(`http://localhost:5000/api/about/article/${page}`)
        .then(res => res.json)
        .then(({ article }: any) =>
          article
            ? article
            : {
                pageTitle: '',
                pagePath: page,
                sections: [
                  {
                    sectionTitle: '',
                    content: '',
                  },
                ],
              }
        ),
  })

  const { fields, append, remove } = useFieldArray({
    name: 'sections',
    control,
  })

  return (
    <section>

    <form>
      <Input
        element='input'
        label='Page Title'
        name='pageTitle'
        control={control}
        placeholder='Enter page title '
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
    </form>
            </section>
  )
}

export default ArticleForm
