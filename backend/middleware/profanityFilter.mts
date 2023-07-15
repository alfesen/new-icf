import { profanity } from '@2toad/profanity'

export const profanityFilter = (value: string) => {
  if (profanity.exists(value)) throw new Error('Profanity detected')
  return true
}
