import { useReducer, useEffect } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { Member, StaffAction, StaffState } from '../../../types/MemberTypes'
import CircleLink from '../../../components/UI/Links/CircleLink/CircleLink'

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

  const renderMembers = (category: Member[]) => {
    return category.map(({ id, name, image }: Member) => {
      return <CircleLink key={name + id} image={image} id={id} name={name} />
    })
  }

  return (
    <section>
      {pastors && pastors.length > 0 && (
        <div>
          <h3>Pastors</h3>
          <hr />
          {renderMembers(pastors)}
        </div>
      )}
      {leadership && leadership.length > 0 && (
        <div>
          <h3>Leadership Team</h3>
          <hr />
          {renderMembers(leadership)}
        </div>
      )}
      {ministryLeaders && ministryLeaders.length > 0 && (
        <div>
          <h3>Ministry Leaders</h3>
          <hr />
          {renderMembers(ministryLeaders)}
        </div>
      )}
    </section>
  )
}

export default Staff
