import { useLocation } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import { FormProps } from '../../../types/UITypes'
import Button from '../../UI/Form/Button/Button'
import ImagePicker from '../../UI/Form/ImagePicker/ImagePicker'
import Input from '../../UI/Form/Input/Input'
import { useForm } from 'react-hook-form'

import s from './HeaderForm.module.scss'

const HeaderForm = ({ onClose, edit, onSubmit }: FormProps) => {
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
        .then(({ headerData }: any) => headerData),
  })

  const headerFormSubmitHandler = async () => {
    const formData = new FormData()
    formData.append('pageTitle', watch('pageTitle'))
    formData.append('pageSubtitle', watch('pageSubtitle'))
    formData.append('desktopImage', watch('desktopImage'))
    formData.append('mobileImage', watch('mobileImage'))
    formData.append('pagePath', pathname)

    if (defaultValues?.id) {
      const { headerData } = await sendRequest(
        `http://localhost:5000/api/${pathname.replaceAll('/', '')}/header`,
        'PATCH',
        formData
      )
      !error && onSubmit(headerData)
    } else {
      const { headerData } = await sendRequest(
        `http://localhost:5000/api/${pathname.replaceAll('/', '')}/header`,
        'POST',
        formData
      )
      !error && onSubmit(headerData)
    }
  }
  
  return (
    <form className={s.form} onSubmit={handleSubmit(headerFormSubmitHandler)}>
      <Input
        rules={{
          required: 'Page title field is required',
          minLength: { value: 3, message: 'Minimum length is 3' },
          maxLength: { value: 50, message: 'Maximum length is 50' },
        }}
        element='input'
        label='Page Title'
        placeholder='Please enter page title'
        name='pageTitle'
        control={control}
      />
      <Input
        rules={{
          required: 'Page subtitle field is required',
          minLength: { value: 3, message: 'Minimum length is 3' },
          maxLength: { value: 50, message: 'Maximum length is 50' },
        }}
        element='input'
        label='Page Subtitle'
        placeholder='Please enter page title'
        name='pageSubtitle'
        control={control}
      />
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

export default HeaderForm
