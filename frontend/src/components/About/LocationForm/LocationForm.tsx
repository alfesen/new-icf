import { useState, useEffect, FormEvent } from 'react'
import Input from '../../UI/Form/Input/Input'
import s from './LocationForm.module.scss'
import { useFetchData } from '../../../hooks/useFetchData'
import { useForm } from '../../../hooks/useForm'
import Button from '../../UI/Form/Button/Button'
import { FormProps } from '../../../types/UITypes'
import ImagePicker from '../../UI/Form/ImagePicker/ImagePicker'

const LocationForm = ({ onClose, edit }: FormProps) => {
  const [isData, setIsData] = useState<boolean>(false)
  const { sendRequest } = useFetchData()

  const { inputHandler, formState, setFormData } = useForm({
    title: { value: '' },
    address: { value: '' },
    image: { value: '' },
    directions: { value: '' },
    map: { value: '' },
  })

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { location } = await sendRequest(
          `http://localhost:5000/api/about/location`
        )
        setIsData(!!location)
        setFormData({
          title: { value: location.title },
          address: { value: location.address },
          image: { value: location.image },
          directions: { value: location.directions },
          map: { value: location.map },
        })
      } catch (err) {}
    }
    setIsData(false)
    getLocation()
  }, [sendRequest])

  const locationFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', formState.inputs.title.value)
    formData.append('address', formState.inputs.address.value)
    formData.append('image', formState.inputs.image.value)
    formData.append('directions', formState.inputs.directions.value)
    formData.append('map', formState.inputs.map.value)
    
    if (isData) {
      await sendRequest(
        `http://localhost:5000/api/about/location`,
        'PATCH',
        formData
      )
    } else
      await sendRequest(
        `http://localhost:5000/api/about/location`,
        'POST',
        formData
      )
    // location.reload()
  }

  return (
    <form className={s.form} onSubmit={locationFormSubmitHandler}>
      <Input
        initialValue={(formState.inputs.title.value as string) || ''}
        element='input'
        label='Page Title'
        onInput={inputHandler}
        placeholder='Please enter section title'
        id='title'
        name='title'
      />
      <Input
        initialValue={(formState.inputs.address.value as string) || ''}
        element='input'
        label='Address'
        onInput={inputHandler}
        placeholder='Please enter the church address'
        id='address'
        name='address'
      />
      <Input
        initialValue={(formState.inputs.directions.value as string) || ''}
        element='textarea'
        label='Directions'
        onInput={inputHandler}
        placeholder='Please enter directions'
        id='directions'
        name='directions'
      />
      <div className={s.form__images}>
        <ImagePicker
          label='Pick the photo'
          image={
            formState.inputs.image.value
              ? formState.inputs.image.value
              : undefined
          }
          onInput={inputHandler}
          id='image'
        />
      </div>
      <Input
        initialValue={(formState.inputs.map.value as string) || ''}
        element='input'
        label='Map link'
        onInput={inputHandler}
        placeholder='Please enter map link'
        id='map'
        name='map'
      />
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

export default LocationForm
