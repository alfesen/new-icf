import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Member } from '../../types/MemberTypes'
import { useFetchData } from '../../hooks/useFetchData'

const MemberPage = () => {
  const [member, setMember] = useState<Member>()
  const { memberId } = useParams()
  const { sendRequest } = useFetchData()

  useEffect(() => {
    const getMember = async () => {
      try {
        const { member } = await sendRequest(
          `http://localhost:5000/api/members/${memberId}`
        )
        setMember(member)
      } catch (err) {}
    }
    getMember()
  }, [])

  return <div>Member</div>
}

export default MemberPage
