import { FormEvent, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import { useFetchData } from '../../../hooks/useFetchData'
import Input from '../../UI/Form/Input/Input'
import ImagePicker from '../../UI/Form/ImagePicker/ImagePicker'
import Button from '../../UI/Form/Button/Button'

const MemberForm = () => {
  const navigate = useNavigate()
  const [isData, setIsData] = useState<boolean>(false)
  const { memberId } = useParams()
  const { formState, inputHandler, setFormData } = useForm({
    name: {
      value: '',
    },
    role: {
      value: '',
    },
    category: {
      value: '',
    },
    image: {
      value: '',
    },
    bio: {
      value: '',
    },
    contact: {
      value: '',
    },
    isAuthor: {
      value: '',
    },
  })
  const { sendRequest } = useFetchData()

  useEffect(() => {
    const getMemberData = async () => {
      try {
        const { member } = await sendRequest(
          `http://localhost:5000/api/members/${memberId}`
        )
        setIsData(!!member)
        if (!!member) {
          setFormData({
            name: { value: member.name },
            role: { value: member.role },
            category: { value: member.category },
            image: { value: member.image },
            bio: { value: member.bio },
            contact: { value: member.contact },
            isAuthor: { value: member.isAuthor },
          })
        }
      } catch (err) {}
    }
    getMemberData()
  }, [])

  const handleAuthorCheckbox = () => {
    inputHandler(
      'isAuthor',
      formState.inputs.isAuthor.value === '' ? 'true' : ''
    )
  }

  const memberFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', formState.inputs.name.value)
    formData.append('role', formState.inputs.role.value)
    formData.append('category', formState.inputs.category.value)
    formData.append('image', formState.inputs.image.value)
    formData.append('bio', formState.inputs.bio.value)
    formData.append('contact', formState.inputs.contact.value)
    formData.append('isAuthor', formState.inputs.isAuthor.value)

    if (!isData) {
      try {
        await sendRequest(
          'http://localhost:5000/api/members/',
          'POST',
          formData
        )
        navigate('/about/our-pastors-and-staff')
      } catch (err) {}
    } else {
      try {
        await sendRequest(
          `http://localhost:5000/api/members/${memberId}`,
          'PATCH',
          formData
        )
        navigate('/about/our-pastors-and-staff')
      } catch (err) {}
    }
  }

  return (
    <form onSubmit={memberFormSubmitHandler}>
      <Input
        element='input'
        name='name'
        label='Name'
        id='name'
        placeholder="Enter new member's name"
        onInput={inputHandler}
        initialValue={(formState.inputs.name.value as string) || ''}
      />
      <Input
        element='input'
        name='role'
        label='Role'
        id='role'
        placeholder="Enter new member's role"
        onInput={inputHandler}
        initialValue={(formState.inputs.role.value as string) || ''}
      />
      <Input
        element='select'
        name='category'
        id='category'
        label='Category'
        options={['pastors', 'leadership team', 'ministry leaders']}
        placeholder="Enter new member's category"
        onInput={inputHandler}
        initialValue={(formState.inputs.category.value as string) || 'pastors'}
      />
      <div className='center'>
        <ImagePicker
          circle
          id='image'
          onInput={inputHandler}
          label='Pick the image'
          image={formState.inputs.image.value as string}
        />
      </div>
      <Input
        element='textarea'
        name='bio'
        id='bio'
        label='Bio'
        placeholder="Enter new member's bio"
        onInput={inputHandler}
        initialValue={(formState.inputs.bio.value as string) || ''}
      />
      <Input
        element='textarea'
        name='contact'
        id='contact'
        label='Contact'
        placeholder="Enter new member's contact"
        onInput={inputHandler}
        initialValue={formState.inputs.contact.value as string}
      />
      <div>
        <label htmlFor='isAuthor'>Author</label>
        <input id='isAuthor' type='checkbox' onChange={handleAuthorCheckbox} />
      </div>
      <div>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default MemberForm
