import { FormEvent, useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import Button from '../../UI/Form/Button/Button'
import Input from '../../UI/Form/Input/Input'
import { useFetchData } from '../../../hooks/useFetchData'

const WelcomeForm = ({ onCancel, route }: { onCancel: () => void, route: string }) => {
  const [isData, setIsData] = useState<boolean>(false)
  const { sendRequest } = useFetchData()
  const { formState, inputHandler, setFormData } = useForm({
    title: {
      value: '',
    },
    content: {
      value: '',
    },
  })

  useEffect(() => {
    const getWelcome = async () => {
      try {
        const { welcomeData } = await sendRequest(
          `http://localhost:5000/api/${route}`
        )
        setIsData(!!welcomeData)
        setFormData({
          title: { value: welcomeData.title },
          content: { value: welcomeData.content },
        })
      } catch (err) {}
    }
    setIsData(false)
    getWelcome()
  }, [sendRequest])

  const welcomeSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const newWelcomeData = {
      title: formState.inputs.title.value,
      content: formState.inputs.content.value,
    }

    if (isData) {
      await sendRequest(
        `http://localhost:5000/api/${route}`,
        'PATCH',
        JSON.stringify(newWelcomeData),
        { 'Content-Type': 'application/json' }
      )
    }
    if (!isData) {
      await sendRequest(
        `http://localhost:5000/api/${route}`,
        'POST',
        JSON.stringify(newWelcomeData),
        { 'Content-Type': 'application/json' }
      )
    }
    location.reload()
  }

  return (
    <form onSubmit={welcomeSubmitHandler}>
      <Input
        id='title'
        label='Title'
        onInput={inputHandler}
        name='welcome-title'
        element='input'
        initialValue={formState.inputs.title.value as string}
        placeholder='Provide title for the section'
      />
      <Input
        id='content'
        label='Content'
        onInput={inputHandler}
        name='welcome-content'
        element='textarea'
        rows={6}
        initialValue={formState.inputs.content.value as string}
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
