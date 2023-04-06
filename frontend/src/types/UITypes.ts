import { ReactNode } from 'react'

export type FormReducer = (state: FormState, action: FormAction) => FormState

export type FormInput = {
  [key: string]: {
    value: string | File
  }
}

export type FormState = {
  inputs: {
    [key: string]: {
      value: string | File
    }
  }
}

export type FormAction =
  | {
      type: 'INPUT_CHANGE'
      inputId: string
      value: string | File
    }
  | {
      type: 'SET_INPUTS'
      inputs: {
        [key: string]: {
          value: string | File
        }
      }
    }

export type InputProps = {
  initialValue: string
  element: 'input' | 'textarea'
  name: string
  placeholder: string
  rows?: number
  id: string
  label?: string
  onInput: (id: string, value: string | File) => void
}

export type ImagePickerProps = {
  image?: string | File
  id: string
  label: string
  onInput: (id: string, value: string | File) => void
}

export type ButtonProps = {
  edit?: boolean
  link?: boolean
  to?: string
  onClick?: () => void
  reverse?: boolean
  children: ReactNode
  type?: 'submit' | 'button' | 'reset'
  side?: boolean
}

export type HeaderFormProps = {
  onClose: () => void
  edit?: boolean
}

export type BackdropProps = {
  onDetach: () => void
}

export type ModalProps = {
  children: ReactNode
  heading: string
  actions?: ReactNode
  show?: boolean
  onDetach: () => void
}

export type CardProps = {
  className?: string
  children: React.ReactNode
}
