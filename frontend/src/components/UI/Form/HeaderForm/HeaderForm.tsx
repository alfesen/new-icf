import { useForm } from '../../../../hooks/useForm'
import ImagePicker from '../ImagePicker'
import Input from '../Input/Input'

const HeaderForm = () => {
  const { inputHandler, formState } = useForm({
    pageTitle: { value: '' },
    pageSubtitle: { value: '' },
    landscapeImage: { value: '' },
    portraitImage: { value: '' },
  })

  return (
    <form>
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
      <ImagePicker
        image={
          formState.inputs.landscapeImage.value
            ? formState.inputs.landscapeImage.value
            : undefined
        }
        id='landscapeImage'
      />
      <ImagePicker
        image={
          formState.inputs.portraitImage.value
            ? formState.inputs.portraitImage.value
            : undefined
        }
        id='portraitImage'
      />
    </form>
  )
}

export default HeaderForm
