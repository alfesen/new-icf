import { useState, useEffect, useRef, ChangeEvent } from 'react'

const ImagePicker = ({ image, id }: { image?: string; id: string }) => {
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
    }
  }

  const pickImageHandler = (): void => {
    pickerRef.current?.click()
  }

  return (
    <div>
      <input
        id={id}
        ref={pickerRef}
        style={{ display: 'none' }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickedImageHandler}
      />
      <div className='image-upload__preview'>
        {previewUrl && <img src={previewUrl} alt='Image Preview' />}
      </div>
      <button type='button' onClick={pickImageHandler}>
        Pick the image
      </button>
    </div>
  )
}

export default ImagePicker
