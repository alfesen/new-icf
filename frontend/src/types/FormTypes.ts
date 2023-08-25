import { ReactNode } from 'react'
import { Control, FieldValues, RegisterOptions } from 'react-hook-form'

export type FormModalProps = {
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

export type InputBase = {
  control: Control<FieldValues>
  label: string
  name: string
  rules?: Pick<
    RegisterOptions<FieldValues>,
    'maxLength' | 'minLength' | 'validate' | 'required'
  >
  type?: string
}

export type InputProps = InputBase &
  (
    | {
        element: 'input'
        placeholder: string
      }
    | {
        element: 'textarea'
        rows?: number
        placeholder: string
      }
    | {
        element: 'select'
        options: string[]
      }
    | {
        element: 'editor'
        placeholder: string
      }
  )

export type FormProps = {
  container?: boolean
  inputs: InputProps[]
  submitHandler: () => Promise<void>
  children: ReactNode
  asHeader?: ReactNode
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
