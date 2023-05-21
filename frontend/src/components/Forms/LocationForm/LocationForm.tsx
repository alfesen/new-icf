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

  const method = defaultValues?.id ? 'PATCH' : 'POST'

  const locationFormSubmitHandler = async () => {
    const formData = new FormData()
    formData.append('title', watch('title'))
    formData.append('address', watch('address'))
    formData.append('image', watch('image'))
    formData.append('directions', watch('directions'))
    formData.append('map', watch('map'))

    try {
      const { location } = await sendRequest(
        `http://localhost:5000/api/about/location`,
        method,
        formData
      )
      !error && onSubmit(location)
    } catch (err) {}
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(locationFormSubmitHandler)}>
      <Input
        control={control}
        element='input'
        label='Page Title'
        placeholder='Please enter section title'
        name='title'
        rules={{
          required: 'Page title is required',
          maxLength: {
            value: 50,
            message: 'Maximum length is 50 characters',
          },
        }}
      />
      <Input
        control={control}
        element='input'
        label='Address'
        placeholder='Please enter the church address'
        name='address'
        rules={{
          required: 'Address is required',
          maxLength: {
            value: 100,
            message: 'Maximum length is 100 characters',
          },
        }}
      />
      <Input
        control={control}
        element='textarea'
        label='Directions'
        placeholder='Please enter directions'
        name='directions'
        rules={{
          required: 'Directions is required',
          maxLength: {
            value: 200,
            message: 'Maximum length is 200 characters'
          }
        }}
      />
      <div className={s.form__images}>
        <ImagePicker
          control={control}
          label='Pick the photo'
          image={defaultValues?.image}
          name='image'
          id='image'
          rules={{
            validate:
              defaultValues?.image.length === 0 &&
              defaultValues?.image === watch('image')
                ? {
                    lessThan10MB: (file: File) =>
                      file.size < 1000000 || 'Maximum 10 MB',
                    acceptedFormats: (file: File) =>
                      ['image/jpeg', 'image/png', 'image/jpg'].includes(
                        file.type
                      ) || 'Only PNG, JPEG or JPG',
                  }
                : undefined,
          }}
        />
      </div>
      <Input
        control={control}
        element='input'
        label='Map link'
        placeholder='Please enter Google iframes source'
        name='map'
        rules={{
          required: 'Map link is required',
        }}
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
