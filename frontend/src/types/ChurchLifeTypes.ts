import { TMember } from './MemberTypes'

export type TEvent = {
  id: string
  title: string
  content: string
  image: string
  date: string
  time: string
}

export type TEventInfo = Pick<TEvent, 'title' | 'date' | 'time' | 'content'>

export type TGroup = {
  id: string
  name: string
  image: string
  category: string
  description: string
  leaders: TMember[]
}

export type TGroupPreview = Pick<TGroup, 'id' | 'name' | 'image'>
