import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ImagePicker from '../../UI/Form/ImagePicker/ImagePicker'
import Button from '../../UI/Form/Button/Button'
import { useFetchData } from '../../../hooks/useFetchData'
import { TMember } from '../../../types/MemberTypes'
import Select from 'react-select'
import Form from '../../UI/Form/Form'

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
          category: 'small group',
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

  useEffect(() => {
    if (defaultValues && defaultValues.leaders.length > 0) {
      setValue(
        'leaders',
        defaultValues.leaders.map((leader: any) => leader.id)
      )
    }
  }, [defaultValues])

  console.log(defaultValues)

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
    <Form
      submitHandler={handleSubmit(groupFormSubmitHandler)}
      container
      inputs={[
        {
          element: 'input',
          name: 'name',
          control,
          label: 'Group name',
          placeholder: 'Enter the group name',
          rules: {
            required: 'Group name is required',
            maxLength: {
              value: 50,
              message: 'Maximum length is 50 characters',
            },
          },
        },
        {
          element: 'select',
          name: 'category',
          label: 'Category',
          control,
          options: ['small group', 'ministry'],
          rules: {
            required: 'Category is required',
          },
        },
        {
          element: 'editor',
          control,
          label: 'Group description',
          name: 'description',
          placeholder: 'Enter the group description',
          rules: {
            required: 'Group description is required',
          },
        },
      ]}>
      {!loading &&
        members.length > 0 &&
        defaultValues?.leaders.length === 0 && (
          <Select
            options={members.map(member => {
              return { value: member.id, label: member.name }
            })}
            isMulti
            onChange={selectedOptions => {
              const selectedValues = selectedOptions.map(option => {
                return option.value
              })
              setValue('leaders', selectedValues)
            }}
            name='selectedLeaders'
            {...register}
          />
        )}
      {!loading &&
        defaultValues &&
        defaultValues.leaders.length > 0 &&
        members.length > 0 && (
          <Select
            options={members.map((member: TMember) => {
              return { value: member.id, label: member.name }
            })}
            isMulti
            onChange={selectedOptions => {
              const selectedValues = selectedOptions.map((option: any) => {
                return option.value
              })
              setValue('leaders', selectedValues)
            }}
            name='selectedLeaders'
            {...register}
            defaultValue={defaultValues.leaders.map((leader: TMember) => {
              return { value: leader.id, label: leader.name }
            })}
          />
        )}
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
      <div className='align-right'>
        <Button reverse onClick={removeGroup}>
          Remove group
        </Button>
        <Button type='submit'>Submit group</Button>
      </div>
    </Form>
  )
}

export default GroupForm
