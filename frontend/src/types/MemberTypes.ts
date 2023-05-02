export type Member = {
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
  pastors: Member[],
  leadership: Member[],
  ministryLeaders: Member[],
}

export type StaffAction = {
  type: 'SET_PASTORS', value: Member[]
} | {type: 'SET_LEADERSHIP', value: Member[]} | {type: 'SET_MINISTERS', value: Member[]}