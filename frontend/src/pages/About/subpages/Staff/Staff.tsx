import { useReducer, useEffect } from 'react'
import { useFetchData } from '../../../../hooks/useFetchData'
import { StaffAction, StaffState } from '../../../../types/MemberTypes'
import Button from '../../../../components/UI/Form/Button/Button'
import s from './Staff.module.scss'
import StaffCategory from '../../../../components/About/StaffCategory/StaffCategory'

const reducer = (state: StaffState, action: StaffAction): StaffState => {
  switch (action.type) {
    case 'SET_PASTORS':
      return { ...state, pastors: action.value }
    case 'SET_LEADERSHIP':
      return { ...state, leadership: action.value }
    case 'SET_MINISTERS':
      return { ...state, ministryLeaders: action.value }
    default:
      return state
  }
}

const Staff = () => {
  const { sendRequest } = useFetchData()
  const [{ pastors, leadership, ministryLeaders }, dispatch] = useReducer(
    reducer,
    {
      pastors: [],
      leadership: [],
      ministryLeaders: [],
    }
  )

  useEffect(() => {
    const getMembers = async () => {
      try {
        const { pastors, leadership, ministryLeaders } = await sendRequest(
          'http://localhost:5000/api/members/'
        )
        if (pastors) {
          dispatch({ type: 'SET_PASTORS', value: pastors })
        }
        if (leadership) {
          dispatch({ type: 'SET_LEADERSHIP', value: leadership })
        }
        if (ministryLeaders) {
          dispatch({ type: 'SET_MINISTERS', value: ministryLeaders })
        }
      } catch (err) {}
    }
    getMembers()
  }, [sendRequest])

  return (
    <section className={s.staff}>
      {pastors && pastors.length > 0 && (
        <StaffCategory category='Pastors' items={pastors} />
      )}
      {leadership && leadership.length > 0 && (
        <StaffCategory category='Leadership Team' items={leadership} />
      )}
      {ministryLeaders && ministryLeaders.length > 0 && (
        <StaffCategory category='Ministry Leaders' items={ministryLeaders} />
      )}
      <div className={s.staff__actions}>
        <Button link to='/staff/edit-member'>
          Add new member
        </Button>
      </div>
    </section>
  )
}

export default Staff
