import { ReactNode } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type NavDropdownProps = {
  links: string[]
  collectionTitle: string
}

export type NavItemProps = {
  title: string
  links?: string[]
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
  to?: string
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

export type TFallbackSection = {
  heading: string
  link: string
  linkText: string
}

export type CircleLinkProps = { image: string; name: string; id: string }

export type BurgerProps = { onToggle: (isActive: boolean) => void }
