import { ChangeEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useFetchData } from '../../../hooks/useFetchData'
import Input from '../../UI/Form/Input/Input'
import ImagePicker from '../../UI/Form/ImagePicker/ImagePicker'
import Button from '../../UI/Form/Button/Button'

const MemberForm = () => {
  const navigate = useNavigate()
  const { memberId } = useParams()
  const { sendRequest } = useFetchData()
  const {
    handleSubmit,
    watch,
    control,
    register,
    setValue,
    formState: { defaultValues },
  } = useForm({
    defaultValues: memberId
      ? async () =>
          fetch(`http://localhost:5000/api/members/${memberId}`)
            .then(res => res.json())
            .then(({ member }: any) => member)
      : {
          name: '',
          role: '',
          category: 'pastors',
          image: '',
          bio: '',
          contact: '',
          isAuthor: '',
        },
  })

  const handleAuthorCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('isAuthor', watch('isAuthor') === '' ? 'true' : '')
  }

  const memberFormSubmitHandler = async () => {
    const formData = new FormData()
    formData.append('name', watch('name'))
    formData.append('role', watch('role'))
    formData.append('category', watch('category'))
    formData.append('image', watch('image'))
    formData.append('bio', watch('bio'))
    formData.append('contact', watch('contact'))
    formData.append('isAuthor', watch('isAuthor'))

    if (!defaultValues) {
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
    <form onSubmit={handleSubmit(memberFormSubmitHandler)}>
      <Input
        element='input'
        name='name'
        label='Name'
        placeholder="Enter new member's name"
        control={control}
      />
      <Input
        element='input'
        name='role'
        label='Role'
        placeholder="Enter new member's role"
        control={control}
      />
      <Input
        control={control}
        element='select'
        name='category'
        label='Category'
        options={['pastors', 'leadership team', 'ministry leaders']}
        placeholder="Enter new member's category"
      />
      <div className='center'>
        <ImagePicker
          control={control}
          circle
          id='image'
          name='image'
          label='Pick the image'
          image={defaultValues?.image}
        />
      </div>
      <Input
        control={control}
        element='textarea'
        name='bio'
        label='Bio'
        placeholder="Enter new member's bio"
      />
      <Input
        element='textarea'
        name='contact'
        label='Contact'
        control={control}
        placeholder="Enter new member's contact"
      />
      <div>
        <label htmlFor='isAuthor'>Author</label>
        <input
          {...register('isAuthor')}
          id='isAuthor'
          name='isAuthor'
          type='checkbox'
          value={'false' ? 'true' : 'false'}
          onChange={handleAuthorCheckbox}
        />
      </div>
      <div>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default MemberForm
