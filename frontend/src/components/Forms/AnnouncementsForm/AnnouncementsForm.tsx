import { useForm } from 'react-hook-form'
import { useFetchData } from '../../../hooks/useFetchData'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Form/Button/Button'
import s from './AnnouncementsForm.module.scss'
import { AnnouncementsFormProps } from '../../../types/FormTypes'

const AnnouncementsForm = ({ id, onSubmit }: AnnouncementsFormProps) => {
  const { sendRequest, error } = useFetchData()
  const url = id
    ? `http://localhost:5000/api/home/announcements/${id}`
    : `http://localhost:5000/api/home/announcements`
  const method = id ? 'PATCH' : 'POST'
  const { handleSubmit, watch, control } = useForm({
    defaultValues: id
      ? () =>
          fetch(url)
            .then(res => res.json())
            .then(({ announcement }: any) => announcement)
      : {
          title: '',
          description: undefined,
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
    try {
      await sendRequest(url, method, JSON.stringify(newAnnouncement), {
        'Content-Type': 'application/json',
      })

      !error && onSubmit()
    } catch (err) {}
  }

  const deleteAnnouncement = async () => {
    try {
      await sendRequest(url, 'DELETE')
    } catch (err) {}
    !error && onSubmit()
  }

  return (
    <form onSubmit={handleSubmit(announcementSubmitHandler)}>
      <Input
        element='input'
        label='Title'
        name='title'
        placeholder='Provide announcement title'
        control={control}
        rules={{
          required: 'Announcement title field is required',
          minLength: { value: 3, message: 'Minimum length is 3' },
          maxLength: { value: 40, message: 'Maximum length is 40' },
        }}
      />
      <Input
        element='textarea'
        name='description'
        label='Description'
        placeholder='Provide announcement description'
        control={control}
        rules={{
          required: {
            value: false,
            message: '"No description provided" will be displayed',
          },
          minLength: { value: 3, message: 'Minimum length is 3' },
          maxLength: { value: 250, message: 'Maximum length is 250' },
        }}
      />
      <Input
        name='date'
        type='date'
        element='input'
        label='Date'
        placeholder='Event date'
        control={control}
        rules={{
          required: 'Date is required',
        }}
      />
      <Input
        name='time'
        type='time'
        element='input'
        label='Time'
        placeholder='Event time'
        control={control}
        rules={{
          required: 'Time is required',
        }}
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
