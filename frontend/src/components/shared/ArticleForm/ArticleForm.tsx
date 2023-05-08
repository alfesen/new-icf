import { useForm, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Form/Button/Button'

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
            <div key={field.id}>
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
              {index > 0 && (
                <Button onClick={() => remove(index)}>Remove section</Button>
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
  )
}

export default ArticleForm
