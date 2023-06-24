import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from '../../UI/Form/Input/Input'
import ImagePicker from '../../UI/Form/ImagePicker/ImagePicker'
import Button from '../../UI/Form/Button/Button'

const EventForm = () => {
  const { eventId } = useParams()
  const {
    watch,
    control,
    formState: { defaultValues },
  } = useForm({
    defaultValues: eventId
      ? async () =>
          fetch(`http://localhost:5000/api/church-life/events/${eventId}`)
            .then(res => res.json())
            .then(({ event }: any) => event)
      : {
          title: '',
          content: '',
          image: '',
          date: '',
          time: '',
        },
  })

  return (
    <form className='container'>
      <Input
        element='input'
        name='title'
        label='Event title'
        placeholder='Enter the event title'
        control={control}
        rules={{
          required: 'Event title is required',
          maxLength: {
            value: 50,
            message: 'Maximum length is 50 characters',
          },
        }}
      />
      <Input
        element='editor'
        name='content'
        label='Event description'
        placeholder='Enter the event description'
        control={control}
        rules={{
          required: 'Event description is required',
        }}
      />
      <div className='center'>
        <ImagePicker
          id='image'
          name='image'
          label='Pick the image'
          image={defaultValues?.image}
          control={control}
          rules={{
            required: 'Event image is required',
            validate:
              defaultValues?.image.length === 0 &&
              defaultValues.image === watch('image')
                ? {
                    lessThan1MB: (file: File) => {
                      file.size < 100000 || 'Maximum 1 MB'
                    },
                    acceptedFormats: (file: File) =>
                      ['image/jpeg', 'image/png', 'image/jpg'].includes(
                        file.type
                      ) || 'Only PNG, JPEG, JPG',
                  }
                : undefined,
          }}
        />
      </div>
      <Input
        type='date'
        element='input'
        control={control}
        rules={{ required: 'Date is required' }}
        name='date'
        label='Event Date'
        placeholder='Enter event date'
      />
      <Input
        type='time'
        element='input'
        control={control}
        rules={{ required: 'Time is required' }}
        name='time'
        label='Event Time'
        placeholder='Enter event time'
      />
      <div className='align-right'>
        <Button type='submit'>Submit event</Button>
      </div>
    </form>
  )
}

export default EventForm
