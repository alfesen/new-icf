import { useReducer, useEffect } from 'react'
import { useFetchData } from '../../../../hooks/useFetchData'
import { StaffAction, StaffState } from '../../../../types/MemberTypes'
import Button from '../../../../components/UI/Form/Button/Button'
import s from './Staff.module.scss'
import StaffCategory from '../../../../components/About/StaffCategory/StaffCategory'
import FallbackSection from '../../../../components/UI/FallbackSection/FallbackSection'
import { Helmet } from 'react-helmet'

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
  const { loading, error, sendRequest } = useFetchData()
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

  const noMembersCondition =
    !pastors.length &&
    !leadership.length &&
    !ministryLeaders.length &&
    !loading &&
    !error

  if (noMembersCondition) {
    return (
      <FallbackSection
        heading='No members added'
        link='/staff/edit-member'
        linkText='Add member'
      />
    )
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          Our Pastors and Staff - International Christian Fellowship of Warsaw
        </title>
        <link rel='canonical' href='#' />
      </Helmet>
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
        <div className='align-right'>
          <Button link to='/staff/edit-member'>
            Add new member
          </Button>
        </div>
      </section>
    </>
  )
}

export default Staff
