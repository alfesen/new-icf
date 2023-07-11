export type TEvent = {
  id: string
  title: string
  content: string
  image: string
  date: string
  time: string
}

export type TEventInfo = Pick<TEvent, 'title' | 'date' | 'time' | 'content'>
