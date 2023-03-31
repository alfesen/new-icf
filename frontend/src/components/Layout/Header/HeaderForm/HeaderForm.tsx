import { FormEvent } from 'react'
import { useForm } from '../../../../hooks/useForm'
import { HeaderFormProps } from '../../../../types/UITypes'
import Button from '../../../UI/Form/Button/Button'
import ImagePicker from '../../../UI/Form/ImagePicker/ImagePicker'
import Input from '../../../UI/Form/Input/Input'

import s from './HeaderForm.module.scss'

const HeaderForm = ({ onCancel }: HeaderFormProps) => {
  const { inputHandler, formState } = useForm({
    pageTitle: { value: '' },
    pageSubtitle: { value: '' },
    landscapeImage: { value: '' },
    portraitImage: { value: '' },
  })

  const headerFormSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    console.log(formState.inputs)
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
            formState.inputs.landscapeImage.value
              ? formState.inputs.landscapeImage.value
              : undefined
          }
          onInput={inputHandler}
          id='landscapeImage'
        />
        <ImagePicker
          label='Pick mobile hero image'
          image={
            formState.inputs.portraitImage.value
              ? formState.inputs.portraitImage.value
              : undefined
          }
          onInput={inputHandler}
          id='portraitImage'
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
