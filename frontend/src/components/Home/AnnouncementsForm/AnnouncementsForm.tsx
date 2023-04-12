import { FormEvent } from 'react'
import { useForm } from '../../../hooks/useForm'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Form/Button/Button'
import { useFetchData } from '../../../hooks/useFetchData'

const AnnouncementsForm = () => {
  const { formState, inputHandler } = useForm({
    title: {
      value: '',
    },
    description: {
      value: '',
    },
    date: {
      value: '',
    },
    time: {
      value: '',
    },
  })
  const { sendRequest } = useFetchData()

  const announcementSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const newAnnouncement = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      date: new Date(formState.inputs.date.value as string).toISOString(),
      time: formState.inputs.time.value,
    }

    try {
     const response =  await sendRequest(
        'http://localhost:5000/api/home/announcements',
        'POST',
        JSON.stringify(newAnnouncement),
        { 'Content-Type': 'application/json' }
      )
      console.log(response)
    } catch (err) {}

    location.reload()
  }

  return (
    <form onSubmit={announcementSubmitHandler}>
      <Input
        element='input'
        id='title'
        label='Title'
        onInput={inputHandler}
        name='announcement-title'
        initialValue={formState.inputs.title.value as string}
        placeholder='Provide announcement title'
      />
      <Input
        element='textarea'
        id='description'
        label='Description'
        onInput={inputHandler}
        name='announcement-description'
        initialValue={formState.inputs.description.value as string}
        placeholder='Provide announcement description'
      />
      <Input
        id='date'
        type='date'
        element='input'
        onInput={inputHandler}
        label='Date'
        name='announcement-date'
        initialValue={formState.inputs.date.value as string}
        placeholder='Event date'
      />
      <Input
        id='time'
        type='time'
        element='input'
        onInput={inputHandler}
        label='Time'
        name='announcement-time'
        initialValue={formState.inputs.time.value as string}
        placeholder='Event time'
      />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default AnnouncementsForm
