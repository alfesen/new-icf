export type TMember = {
  id: string
  name: string
  role: string
  category: string
  image: string
  bio: string
  contact: string
  isAuthor: boolean
}

export type StaffReducer = (state: StaffState, action: StaffAction) => StaffState

export type StaffState = {
  pastors: TMember[],
  leadership: TMember[],
  ministryLeaders: TMember[],
}

export type StaffAction = {
  type: 'SET_PASTORS', value: TMember[]
} | {type: 'SET_LEADERSHIP', value: TMember[]} | {type: 'SET_MINISTERS', value: TMember[]}