import { FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm } from '../../../../hooks/useForm'
import { useFetchData } from '../../../../hooks/useFetchData'
import { HeaderFormProps } from '../../../../types/UITypes'
import Button from '../../../UI/Form/Button/Button'
import ImagePicker from '../../../UI/Form/ImagePicker/ImagePicker'
import Input from '../../../UI/Form/Input/Input'

import s from './HeaderForm.module.scss'

const HeaderForm = ({ onCancel }: HeaderFormProps) => {
  const { pathname } = useLocation()
  const { sendRequest } = useFetchData()

  const { inputHandler, formState } = useForm({
    pageTitle: { value: '' },
    pageSubtitle: { value: '' },
    desktopImage: { value: '' },
    mobileImage: { value: '' },
  })

  const headerFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('pageTitle', formState.inputs.pageTitle.value)
    formData.append('pageSubtitle', formState.inputs.pageSubtitle.value)
    formData.append('desktopImage', formState.inputs.desktopImage.value)
    formData.append('mobileImage', formState.inputs.mobileImage.value)
    formData.append('path', pathname)

    await sendRequest(
      `http://localhost:5000/api${pathname}/header`,
      'POST',
      formData
    )
  }

  return (
    <form className={s.form} onSubmit={headerFormSubmitHandler}>
      <Input
        element='input'
        label='Page Title'
        onInput={inputHandler}
        placeholder='Please enter page title'
        id='pageTitle'
        name='pageTitle'
      />
      <Input
        element='input'
        label='Page Subtitle'
        onInput={inputHandler}
        placeholder='Please enter page title'
        id='pageSubtitle'
        name='pageSubtitle'
      />
      <div className={s.form__images}>
        <ImagePicker
          label='Pick desktop hero image'
          image={
            formState.inputs.desktopImage.value
              ? formState.inputs.desktopImage.value
              : undefined
          }
          onInput={inputHandler}
          id='desktopImage'
        />
        <ImagePicker
          label='Pick mobile hero image'
          image={
            formState.inputs.mobileImage.value
              ? formState.inputs.mobileImage.value
              : undefined
          }
          onInput={inputHandler}
          id='mobileImage'
        />
      </div>
      <div className={s.form__actions}>
        <Button onClick={onCancel} type='button' reverse>
          Cancel
        </Button>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default HeaderForm
