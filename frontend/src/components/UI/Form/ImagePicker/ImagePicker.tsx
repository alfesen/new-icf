import { useState, useEffect, useRef } from 'react'
import Button from '../Button/Button'
import s from './ImagePicker.module.scss'

import { useController } from 'react-hook-form'
import { ImagePickerProps } from '../../../../types/FormTypes'

const ImagePicker = ({
  name,
  control,
  id,
  label,
  image,
  circle,
  rules,
}: ImagePickerProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules })
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const pickerRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (image) {
      setPreviewImage(`http://localhost:5000/${image}`)
    }
  }, [image])

  const pickImageHandler = (): void => {
    pickerRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(selectedImage)
      field.onChange(selectedImage)
    }
  }

  return (
    <div className={s.picker}>
      <input
        data-testid='image-picker'
        id={id}
        ref={pickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={handleImageChange}
      />
      <div
        className={`${s.picker__preview} ${
          circle ? s['picker__preview--circle'] : ''
        }`}>
        {previewImage && <img src={previewImage} alt='Image Preview' />}
        {!previewImage && <p>{label}</p>}
      </div>
      <Button type='button' onClick={pickImageHandler}>
        Pick the image
      </Button>
      <sub className='invalid'>{error?.message}</sub>
    </div>
  )
}

export default ImagePicker
