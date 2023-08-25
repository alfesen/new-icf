import { useForm } from 'react-hook-form'
import { useFetchData } from '../../../hooks/useFetchData'
import { FormModalProps } from '../../../types/FormTypes'
import Button from '../../UI/Form/Button/Button'
import ImagePicker from '../../UI/Form/ImagePicker/ImagePicker'
import Form from '../../UI/Form/Form'

const LocationForm = ({ onClose, onSubmit }: FormModalProps) => {
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
      await sendRequest(
        `http://localhost:5000/api/about/location`,
        method,
        formData
      )
      !error && onSubmit()
    } catch (err) {}
  }

  return (
    <Form
      submitHandler={handleSubmit(locationFormSubmitHandler)}
      inputs={[
        {
          element: 'input',
          label: 'Page Title',
          control,
          name: 'title',
          placeholder: 'Please enter section title',
          rules: {
            required: 'Page title is required',
            maxLength: {
              value: 50,
              message: 'Maximum length is 50 characters',
            },
          },
        },
        {
          element: 'input',
          label: 'Address',
          control,
          name: 'address',
          placeholder: 'Please enter the church address',
          rules: {
            required: 'Address is required',
            maxLength: {
              value: 100,
              message: 'Maximum length is 100 characters',
            },
          },
        },
        {
          element: 'textarea',
          label: 'Directions',
          control,
          name: 'directions',
          placeholder: 'Please enter directions',
          rules: {
            required: 'Directions is required',
            maxLength: {
              value: 200,
              message: 'Maximum length is 200 characters',
            },
          },
        },
        {
          element: 'input',
          label: 'Map link',
          control,
          name: 'map',
          placeholder: 'Please enter Google iframes source',
          rules: {
            required: 'Map link is required',
          },
        },
      ]}>
      <div className='center'>
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
      <div className='align-right'>
        <Button onClick={onClose} type='button' reverse>
          Cancel
        </Button>
        <Button type='submit'>Submit</Button>
      </div>
    </Form>
  )
}

export default LocationForm
