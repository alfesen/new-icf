import { useForm } from '../../../hooks/useForm'
import Button from '../../UI/Form/Button/Button'
import Input from '../../UI/Form/Input/Input'
import Modal from '../../UI/Modal/Modal'

const WelcomeForm = () => {
  const { formState, inputHandler } = useForm({
    title: {
      value: '',
    },
    content: {
      value: '',
    },
  })

  return (
    <Modal onDetach={() => {}} heading='Editing Welcome'>
      <form>
        <Input
          id='welcome-title-input'
          label='Title'
          onInput={inputHandler}
          name='welcome-title'
          element='input'
          initialValue={formState.inputs.title.value as string}
          placeholder='Provide title for the section'
        />
        <Input
          id='welcome-content-input'
          label='Content'
          onInput={inputHandler}
          name='welcome-content'
          element='textarea'
          rows={6}
          initialValue={formState.inputs.content.value as string}
          placeholder='Provide content for the section'
        />
        <div>
          <Button type='button' reverse>
            Cancel
          </Button>
          <Button type='submit'>Submit</Button>
        </div>
        <div>
          <Button type='button'>Remove section</Button>
        </div>
      </form>
    </Modal>
  )
}

export default WelcomeForm
