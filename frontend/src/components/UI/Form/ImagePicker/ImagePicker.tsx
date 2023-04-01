import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { ImagePickerProps } from '../../../../types/UITypes'
import Button from '../Button/Button'
import s from './ImagePicker.module.scss'

const ImagePicker = ({ image, id, label, onInput }: ImagePickerProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  const pickerRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (image) {
      setPreviewUrl(`http://localhost:5000/${image}`)
    }

    if (!file) {
      return
    }

    const fileReader = new FileReader()
    fileReader.onload = () => setPreviewUrl(fileReader.result as string)
    fileReader.readAsDataURL(file)
  }, [file, image])

  const pickedImageHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target
    let pickedFile: File
    if (files || files!.length === 1) {
      pickedFile = files![0]
      setFile(pickedFile)
      onInput(id, pickedFile)
    }
  }

  const pickImageHandler = (): void => {
    pickerRef.current?.click()
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
        onChange={pickedImageHandler}
      />
      <div className={s.picker__preview}>
        {previewUrl && <img src={previewUrl} alt='Image Preview' />}
        {!previewUrl && <p>{label}</p>}
      </div>
      <Button type='button' onClick={pickImageHandler}>
        Pick the image
      </Button>
    </div>
  )
}

export default ImagePicker
