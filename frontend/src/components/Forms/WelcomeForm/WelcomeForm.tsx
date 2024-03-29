import { useForm } from 'react-hook-form'
import { useFetchData } from '../../../hooks/useFetchData'
import { WelcomeFormProps } from '../../../types/FormTypes'
import Button from '../../UI/Form/Button/Button'
import Form from '../../UI/Form/Form'

const WelcomeForm = ({ onCancel, route, onSubmit }: WelcomeFormProps) => {
  const { sendRequest, error } = useFetchData()
  const {
    control,
    watch,
    formState: { defaultValues },
    handleSubmit,
  } = useForm({
    defaultValues: async () =>
      fetch(`http://localhost:5000/api/${route}`)
        .then(res => res.json())
        .then(({ welcomeData }: any) => welcomeData),
  })

  const method = defaultValues?.id ? 'PATCH' : 'POST'

  const welcomeSubmitHandler = async () => {
    const newWelcomeData = {
      title: watch('title'),
      content: watch('content'),
    }

    if (defaultValues) {
      const { welcomeData } = await sendRequest(
        `http://localhost:5000/api/${route}`,
        method,
        JSON.stringify(newWelcomeData),
        { 'Content-Type': 'application/json' }
      )
      !error && onSubmit(welcomeData)
    }
  }

  return (
    <Form
      submitHandler={handleSubmit(welcomeSubmitHandler)}
      inputs={[
        {
          element: 'input',
          name: 'title',
          control,
          label: 'Title',
          placeholder: 'Provide title for the section',
          rules: {
            required: 'This field is required',
            maxLength: {
              value: 40,
              message: 'Maximum value is 40 characters',
            },
            minLength: {
              value: 5,
              message: 'Minimum value is 5 characters',
            },
          },
        },
        {
          label: 'Content',
          name: 'content',
          control,
          element: 'editor',
          placeholder: 'Provide the content for the section',
          rules: {},
        },
      ]}>
      <div>
        <Button type='button' onClick={onCancel} reverse>
          Cancel
        </Button>
        <Button type='submit'>Submit</Button>
      </div>
    </Form>
  )
}

export default WelcomeForm
