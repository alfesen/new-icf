import { useForm } from 'react-hook-form'
import { useFetchData } from '../../../hooks/useFetchData'
import Button from '../../UI/Form/Button/Button'
import { AnnouncementsFormProps } from '../../../types/FormTypes'
import Form from '../../UI/Form/Form'

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
    <Form
      submitHandler={handleSubmit(announcementSubmitHandler)}
      inputs={[
        {
          element: 'input',
          name: 'title',
          label: 'Title',
          control: control,
          placeholder: 'Provide announcement title',
          rules: {
            required: 'Announcement title field is required',
            minLength: { value: 3, message: 'Minimum length is 3' },
            maxLength: { value: 40, message: 'Maximum length is 40' },
          },
        },
        {
          element: 'textarea',
          name: 'description',
          label: 'Description',
          control: control,
          placeholder: 'Provide announcement description',
          rules: {
            required: {
              value: false,
              message: '"No description provided" will be displayed',
            },
            minLength: { value: 3, message: 'Minimum length is 3' },
            maxLength: { value: 250, message: 'Maximum length is 250' },
          },
        },
        {
          element: 'input',
          name: 'date',
          label: 'Date',
          type: 'date',
          control: control,
          placeholder: 'Event date',
          rules: {
            required: 'Date is required',
          },
        },
        {
          element: 'input',
          name: 'time',
          label: 'Time',
          type: 'time',
          control: control,
          placeholder: 'Event time',
          rules: {
            required: 'Time is required',
          },
        },
      ]}>
      <div className='align-right'>
        {id && (
          <Button reverse onClick={deleteAnnouncement} type='button'>
            Delete
          </Button>
        )}
        <Button type='submit'>Submit</Button>
      </div>
    </Form>
  )
}

export default AnnouncementsForm
