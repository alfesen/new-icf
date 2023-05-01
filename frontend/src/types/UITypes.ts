import { ReactNode } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

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
  type?: string
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
