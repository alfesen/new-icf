import { FormEvent, useEffect } from 'react'
import { useForm } from '../../../hooks/useForm'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Form/Button/Button'
import { useFetchData } from '../../../hooks/useFetchData'
import s from './AnnouncementsForm.module.scss'

const AnnouncementsForm = ({ id }: { id?: string }) => {
  const { formState, inputHandler, setFormData } = useForm({
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

  useEffect(() => {
    const getAnnouncement = async () => {
      try {
        const { announcement } = await sendRequest(
          `http://localhost:5000/api/home/announcements/${id}`
        )
        setFormData({
          title: { value: announcement.title },
          description: { value: announcement.description },
          date: { value: announcement.date },
          time: { value: announcement.time },
        })
      } catch (err) {}
    }
    if (id) {
      getAnnouncement()
    }
  }, [sendRequest])

  const announcementSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const newAnnouncement = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      date: new Date(formState.inputs.date.value as string).toISOString(),
      time: formState.inputs.time.value,
    }

    if (!id) {
      try {
        await sendRequest(
          'http://localhost:5000/api/home/announcements',
          'POST',
          JSON.stringify(newAnnouncement),
          { 'Content-Type': 'application/json' }
        )
      } catch (err) {}
    } else {
      try {
        await sendRequest(
          `http://localhost:5000/api/home/announcements/${id}`,
          'PATCH',
          JSON.stringify(newAnnouncement),
          { 'Content-Type': 'application/json' }
        )
      } catch (err) {}
    }

    location.reload()
  }

  const deleteAnnouncement = async () => {
    if (id) {
      try {
        await sendRequest(
          `http://localhost:5000/api/home/announcements/${id}`,
          'DELETE'
        )
      } catch (err) {}
    }
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
      <div className={s.form__actions}>
        {id && <Button reverse onClick={deleteAnnouncement} type='button'>Delete</Button>}
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default AnnouncementsForm
