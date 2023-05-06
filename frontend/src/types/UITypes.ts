import { ReactNode } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Control, FieldValues, RegisterOptions } from 'react-hook-form'

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
  control: Control<FieldValues>
  element: string
  rows?: number
  label: string
  placeholder: string
  type?: string
  options?: string[]
  name: string
  rules?: Pick<RegisterOptions<FieldValues>, 'maxLength' | 'minLength' | 'validate' | 'required'>
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

export type FormProps = {
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

export type ImageLinkProps = {
  className?: string
  image: string
  link: string
}

export type UsefulLinkProps = {
  image: string
  text: string
  url: string
}

export type IconLinkProps = {
  className?: string
  url: string
  icon: IconDefinition
}

export type CircleLinkProps = {image: string, name: string, id: string}

export type BurgerProps = { onToggle: (isActive: boolean) => void }

export type WelcomeFormProps = { onCancel: () => void; route: string }
