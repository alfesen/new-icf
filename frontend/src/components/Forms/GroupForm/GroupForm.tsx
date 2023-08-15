import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from '../../UI/Form/Input/Input'
import ImagePicker from '../../UI/Form/ImagePicker/ImagePicker'
import Button from '../../UI/Form/Button/Button'
import { useFetchData } from '../../../hooks/useFetchData'
import { TMember } from '../../../types/MemberTypes'
import Select from 'react-select'

const GroupForm = () => {
  const [members, setMembers] = useState<TMember[]>([])
  const { groupId } = useParams()
  const { sendRequest, loading, error, clearError } = useFetchData()
  const {
    handleSubmit,
    watch,
    control,
    register,
    setValue,
    formState: { defaultValues },
  } = useForm({
    defaultValues: groupId
      ? async () =>
          fetch(`http://localhost:5000/api/church-life/groups/${groupId}`)
            .then(res => res.json())
            .then(({ group }: any) => group)
      : {
          name: '',
          description: '',
          category: '',
          image: '',
          leaders: [],
        },
  })
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { pastors, leadership, ministryLeaders } = await sendRequest(
          'http://localhost:5000/api/members'
        )
        setMembers([...pastors, ...leadership, ...ministryLeaders])
      } catch {}
    }
    fetchMembers()
  }, [])

  const navigate = useNavigate()

  const url = groupId
    ? `http://localhost:5000/api/church-life/groups/${groupId}`
    : `http://localhost:5000/api/church-life/groups`
  const method = groupId ? 'PATCH' : 'POST'

  const groupFormSubmitHandler = async () => {
    const formData = new FormData()
    formData.append('name', watch('name'))
    formData.append('description', watch('description'))
    formData.append('image', watch('image'))
    formData.append('category', watch('category'))
    watch('leaders').forEach((leader: string) =>
      formData.append('leaders[]', leader)
    )
    try {
      await sendRequest(url, method, formData)
      !error && navigate('/church-life/small-groups-and-ministries')
    } catch {
      clearError()
    }
  }

  const removeGroup = async () => {
    try {
      await sendRequest(url, 'DELETE')
    } catch (err) {}
  }

  return (
    <form className='container' onSubmit={handleSubmit(groupFormSubmitHandler)}>
      <Input
        element='input'
        name='name'
        label='Group name'
        placeholder='Enter the group name'
        control={control}
        rules={{
          required: 'Group name is required',
          maxLength: {
            value: 50,
            message: 'Maximum length is 50 characters',
          },
        }}
      />
      <Input
        element='select'
        name='category'
        label='Category'
        options={['small group', 'ministry']}
        control={control}
        rules={{
          required: 'Group description is required',
        }}
      />
      <Input
        element='editor'
        name='description'
        label='Group description'
        placeholder='Enter the group description'
        control={control}
        rules={{
          required: 'Group description is required',
        }}
      />
      <div className='center'>
        <ImagePicker
          id='image'
          name='image'
          label='Pick the image'
          image={defaultValues?.image}
          control={control}
          rules={{
            required: 'Group image is required',
            validate:
              defaultValues?.image.length === 0 &&
              defaultValues.image === watch('image')
                ? {
                    lessThan1MB: (file: File) => {
                      file.size < 100000 || 'Maximum 1 MB'
                    },
                    acceptedFormats: (file: File) =>
                      ['image/jpeg', 'image/png', 'image/jpg'].includes(
                        file.type
                      ) || 'Only PNG, JPEG, JPG',
                  }
                : undefined,
          }}
        />
      </div>
      {!loading && members.length > 0 && (
        <Select
          options={members.map(member => {
            return { value: member, label: member.name }
          })}
          isMulti
          onChange={selectedOptions => {
            const selectedValues = selectedOptions.map(
              option => option.value.id
            )
            setValue('leaders', selectedValues)
          }}
          name='selectedLeaders'
          {...register}
        />
      )}
      <div className='align-right'>
        <Button reverse onClick={removeGroup}>
          Remove group
        </Button>
        <Button type='submit'>Submit group</Button>
      </div>
    </form>
  )
}

export default GroupForm
