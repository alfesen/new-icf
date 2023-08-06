import { IGroup, IMember } from '../types'

export const categorizePreviews = <T extends IGroup | IMember>(
  objects: T[],
  criteria: T extends IGroup
    ? IGroup['category']
    : T extends IMember
    ? IMember['category']
    : never
) => {
  return objects
    .filter(o => o.category === criteria)
    .map(o => {
      if ('toObject' in o && typeof o.toObject === 'function') {
        return o.toObject({ getters: true })
      }
      return o
    })
    .map(({ id, image, name }) => {
      return { id, image, name }
    })
}
