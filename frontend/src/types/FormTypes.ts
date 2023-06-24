import { Control, FieldValues, RegisterOptions } from 'react-hook-form'

export type FormProps = {
  onClose?: () => void
  onSubmit: () => void
}

export type WelcomeFormProps = {
  onCancel: () => void
  route: string
  onSubmit: (data: any) => void
}

export type AnnouncementsFormProps = {
  id?: string
  onSubmit: () => void
}

export type InputProps = {
  control: Control<FieldValues>
  element: string
  rows?: number
  label: string
  placeholder: string
  type?: string
  options?: string[]
  name: string
  rules?: Pick<
    RegisterOptions<FieldValues>,
    'maxLength' | 'minLength' | 'validate' | 'required'
  >
}

export type ImagePickerProps = {
  name: string
  control: Control<FieldValues>
  id: string
  label: string
  image: string | undefined
  circle?: boolean
  rules?: object
}
