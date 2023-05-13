import { useForm } from 'react-hook-form'
import { useFetchData } from '../../../hooks/useFetchData'
import { WelcomeFormProps } from '../../../types/UITypes'
import Button from '../../UI/Form/Button/Button'
import Input from '../../UI/Form/Input/Input'

const WelcomeForm = ({ onCancel, route, onSubmit }: WelcomeFormProps) => {
  const { sendRequest } = useFetchData()
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

  const welcomeSubmitHandler = async () => {
    const newWelcomeData = {
      title: watch('title'),
      content: watch('content'),
    }

    if (defaultValues) {
      const { welcomeData } = await sendRequest(
        `http://localhost:5000/api/${route}`,
        'PATCH',
        JSON.stringify(newWelcomeData),
        { 'Content-Type': 'application/json' }
      )
      onSubmit(welcomeData)
    }
    const { welcomeData } = await sendRequest(
      `http://localhost:5000/api/${route}`,
      'POST',
      JSON.stringify(newWelcomeData),
      { 'Content-Type': 'application/json' }
    )
    onSubmit(welcomeData)
  }

  return (
    <form onSubmit={handleSubmit(welcomeSubmitHandler)}>
      <Input
        rules={{
          required: 'This field is required',
          maxLength: {
            value: 40,
            message: 'Maximum value is 40 characters',
          },
          minLength: {
            value: 5,
            message: 'Minimum value is 5 characters',
          },
        }}
        label='Title'
        name='title'
        control={control}
        element='input'
        placeholder='Provide title for the section'
      />
      <Input
        rules={{ required: 'This field is required' }}
        label='Content'
        name='content'
        element='textarea'
        rows={6}
        control={control}
        placeholder='Provide content for the section'
      />
      <div>
        <Button type='button' onClick={onCancel} reverse>
          Cancel
        </Button>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default WelcomeForm
