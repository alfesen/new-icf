import { useForm } from 'react-hook-form'
import { useFetchData } from '../../../hooks/useFetchData'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Form/Button/Button'
import s from './AnnouncementsForm.module.scss'

const AnnouncementsForm = ({
  id,
  onSubmit,
}: {
  id?: string
  onSubmit: () => void
}) => {
  const { sendRequest, error } = useFetchData()
  const { handleSubmit, watch, control } = useForm({
    defaultValues: id
      ? async () =>
          fetch(`http://localhost:5000/api/home/announcements/${id}`)
            .then(res => res.json())
            .then(({ announcement }: any) => announcement)
      : {
          title: '',
          description: '',
          date: '',
          time: '',
        },
  })

  const announcementSubmitHandler = async () => {
    const newAnnouncement = {
      title: watch('title'),
      description: watch('description'),
      date: new Date(watch('date')).toISOString(),
      time: watch('time'),
    }
    if (!id) {
      try {
        await sendRequest(
          'http://localhost:5000/api/home/announcements',
          'POST',
          JSON.stringify(newAnnouncement),
          { 'Content-Type': 'application/json' }
        )

        !error && onSubmit()
      } catch (err) {}
    } else {
      try {
        await sendRequest(
          `http://localhost:5000/api/home/announcements/${id}`,
          'PATCH',
          JSON.stringify(newAnnouncement),
          { 'Content-Type': 'application/json' }
        )
        !error && onSubmit()
      } catch (err) {}
    }
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
    !error && onSubmit()
  }

  return (
    <form onSubmit={handleSubmit(announcementSubmitHandler)}>
      <Input
        element='input'
        label='Title'
        name='title'
        control={control}
        placeholder='Provide announcement title'
      />
      <Input
        element='textarea'
        name='description'
        label='Description'
        control={control}
        placeholder='Provide announcement description'
      />
      <Input
        name='date'
        type='date'
        element='input'
        label='Date'
        placeholder='Event date'
        control={control}
      />
      <Input
        name='time'
        type='time'
        element='input'
        label='Time'
        placeholder='Event time'
        control={control}
      />
      <div className={s.form__actions}>
        {id && (
          <Button reverse onClick={deleteAnnouncement} type='button'>
            Delete
          </Button>
        )}
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default AnnouncementsForm
