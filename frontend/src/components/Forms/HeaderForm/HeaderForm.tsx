import { useLocation } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import { FormModalProps } from '../../../types/FormTypes'
import Button from '../../UI/Form/Button/Button'
import ImagePicker from '../../UI/Form/ImagePicker/ImagePicker'
import { useForm } from 'react-hook-form'

import s from './HeaderForm.module.scss'
import Form from '../../UI/Form/Form'

const HeaderForm = ({ onClose, onSubmit }: FormModalProps) => {
  const { pathname } = useLocation()
  const { sendRequest, error } = useFetchData()

  const {
    handleSubmit,
    formState: { defaultValues },
    control,
    watch,
  } = useForm({
    defaultValues: () =>
      fetch(`http://localhost:5000/api/${pathname.replaceAll('/', '')}/header`)
        .then(res => res.json())
        .then(
          ({ headerData }: any) =>
            headerData || {
              pageTitle: '',
              pageSubtitle: '',
              desktopImage: '',
              mobileImage: '',
              pagePath: '',
            }
        ),
  })

  const headerFormSubmitHandler = async () => {
    const formData = new FormData()
    formData.append('pageTitle', watch('pageTitle'))
    formData.append('pageSubtitle', watch('pageSubtitle'))
    formData.append('desktopImage', watch('desktopImage'))
    formData.append('mobileImage', watch('mobileImage'))
    formData.append('pagePath', pathname)

    if (defaultValues?.id) {
      await sendRequest(
        `http://localhost:5000/api/${pathname.replaceAll('/', '')}/header`,
        'PATCH',
        formData
      )
      !error && onSubmit()
    } else {
      await sendRequest(
        `http://localhost:5000/api/${pathname.replaceAll('/', '')}/header`,
        'POST',
        formData
      )
      !error && onSubmit()
    }
  }

  return (
    <Form
      submitHandler={handleSubmit(headerFormSubmitHandler)}
      inputs={[
        {
          element: 'input',
          control,
          label: 'Page Title',
          name: 'pageTitle',
          placeholder: 'Please enter page title',
          rules: {
            required: 'Page title field is required',
            minLength: { value: 3, message: 'Minimum length is 3' },
            maxLength: { value: 50, message: 'Maximum length is 50' },
          },
        },
        {
          element: 'input',
          control,
          label: 'Page Subtitle',
          name: 'pageSubtitle',
          placeholder: 'Please enter page subtitle',
          rules: {
            required: 'Page subtitle field is required',
            minLength: { value: 3, message: 'Minimum length is 3' },
            maxLength: { value: 50, message: 'Maximum length is 50' },
          },
        },
      ]}>
      <div className={s.form__images}>
        <ImagePicker
          rules={{
            required: 'Desktop Hero Image is required',
            validate:
              defaultValues?.desktopImage.length === 0 &&
              defaultValues?.desktopImage === watch('desktopImage')
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
          label='Pick desktop hero image'
          image={defaultValues?.desktopImage}
          control={control}
          id='desktopImage'
          name='desktopImage'
        />
        <ImagePicker
          rules={{
            required: 'Mobile Hero Image is required',
            validate:
              defaultValues?.mobileImage.length === 0 &&
              defaultValues?.mobileImage === watch('mobileImage')
                ? {
                    lessThan6MB: (file: File) =>
                      file.size < 600000 || 'Maximum 6 MB',
                    acceptedFormats: (file: File) =>
                      ['image/jpeg', 'image/png', 'image/gif'].includes(
                        file.type
                      ) || 'Only PNG, JPEG e GIF',
                  }
                : undefined,
          }}
          label='Pick mobile hero image'
          image={defaultValues?.mobileImage}
          id='desktopImage'
          control={control}
          name='mobileImage'
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

export default HeaderForm
