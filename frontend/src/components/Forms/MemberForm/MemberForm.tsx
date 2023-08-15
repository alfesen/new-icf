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
  const { sendRequest, error } = useFetchData()
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
          isAuthor: false,
        },
  })

  const url = memberId
    ? `http://localhost:5000/api/members/${memberId}`
    : `http://localhost:5000/api/members`
  const method = memberId ? 'PATCH' : 'POST'

  const handleAuthorCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('isAuthor', e.target.checked)
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

    try {
      await sendRequest(url, method, formData)
      !error && navigate('/about/our-pastors-and-staff')
    } catch (err) {}
  }

  return (
    <form onSubmit={handleSubmit(memberFormSubmitHandler)}>
      <Input
        element='input'
        name='name'
        label='Name'
        placeholder="Enter new member's name"
        control={control}
        rules={{
          required: "Member's name is required",
        }}
      />
      <Input
        element='input'
        name='role'
        label='Role'
        placeholder="Enter new member's role"
        control={control}
        rules={{
          required: "Member's role is required",
          maxLength: {
            value: 50,
            message: "Maximum length is 50 characters'",
          },
        }}
      />
      <Input
        control={control}
        element='select'
        name='category'
        label='Category'
        options={['pastors', 'leadership team', 'ministry leaders']}
        rules={{
          required: "Member's category is required",
        }}
      />
      <div className='center'>
        <ImagePicker
          control={control}
          circle
          id='image'
          name='image'
          label='Pick the image'
          image={defaultValues?.image}
          rules={{
            required: "Member's avatar is required",
            validate:
              defaultValues?.image.length === 0 &&
              defaultValues?.image === watch('image')
                ? {
                    lessThan6MB: (file: File) =>
                      file.size < 600000 || 'Maximum 6 MB',
                    acceptedFormats: (file: File) =>
                      ['image/jpeg', 'image/png', 'image/jpg'].includes(
                        file.type
                      ) || 'Only PNG, JPEG, JPG',
                  }
                : undefined,
          }}
        />
      </div>
      <Input
        control={control}
        element='textarea'
        name='bio'
        label='Bio'
        placeholder="Enter new member's bio"
        rules={{
          required: "Member's bio is required",
        }}
      />
      <Input
        element='textarea'
        name='contact'
        label='Contact'
        control={control}
        placeholder="Enter new member's contact"
        rules={{}}
      />
      <div>
        <label htmlFor='isAuthor'>Author</label>
        <input
          {...register('isAuthor')}
          id='isAuthor'
          name='isAuthor'
          type='checkbox'
          onChange={handleAuthorCheckbox}
        />
      </div>
      <div className='align-right'>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

export default MemberForm
