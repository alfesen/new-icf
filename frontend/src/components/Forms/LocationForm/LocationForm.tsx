import { useForm } from 'react-hook-form'
import { useFetchData } from '../../../hooks/useFetchData'
import { FormProps } from '../../../types/UITypes'
import Input from '../../UI/Form/Input/Input'
import Button from '../../UI/Form/Button/Button'
import ImagePicker from '../../UI/Form/ImagePicker/ImagePicker'
import s from './LocationForm.module.scss'

const LocationForm = ({ onClose, edit, onSubmit }: FormProps) => {
  const { sendRequest, error } = useFetchData()

  const {
    handleSubmit,
    watch,
    control,
    formState: { defaultValues },
  } = useForm({
    defaultValues: async () =>
      fetch(`http://localhost:5000/api/about/location`)
        .then(res => res.json())
        .then(({ location }: any) => location) || {
        title: '',
        address: '',
        image: '',
        directions: '',
        map: '',
      },
  })

  const locationFormSubmitHandler = async () => {
    const formData = new FormData()
    formData.append('title', watch('title'))
    formData.append('address', watch('address'))
    formData.append('image', watch('image'))
    formData.append('directions', watch('directions'))
    formData.append('map', watch('map'))

    if (defaultValues) {
      const { location } = await sendRequest(
        `http://localhost:5000/api/about/location`,
        'PATCH',
        formData
      )
      !error && onSubmit(location)
    } else {
      const { location } = await sendRequest(
        `http://localhost:5000/api/about/location`,
        'POST',
        formData
      )
      !error && onSubmit(location)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(locationFormSubmitHandler)}>
      <Input
        control={control}
        element='input'
        label='Page Title'
        placeholder='Please enter section title'
        name='title'
      />
      <Input
        control={control}
        element='input'
        label='Address'
        placeholder='Please enter the church address'
        name='address'
      />
      <Input
        control={control}
        element='textarea'
        label='Directions'
        placeholder='Please enter directions'
        name='directions'
      />
      <div className={s.form__images}>
        <ImagePicker
          control={control}
          label='Pick the photo'
          image={defaultValues?.image}
          name='image'
          id='image'
        />
      </div>
      <Input
        control={control}
        element='input'
        label='Map link'
        placeholder='Please enter map link'
        name='map'
      />
      <div className={s.form__actions}>
        {edit && (
          <Button onClick={onClose} type='button' reverse>
            Cancel
          </Button>
        )}
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default LocationForm
