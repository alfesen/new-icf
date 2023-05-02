import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Member } from '../../types/MemberTypes'
import { useFetchData } from '../../hooks/useFetchData'
import { convertString } from '../../helpers/convertString'

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

  if (!member) {
    return <h2>No staff member with provided ID </h2>
  }

  const { image, name, role, bio, contact } = member

  return (
    <section>
      <header>
        <div>
          <img src={`http://localhost:5000/${image}`} alt={`${name} avatar`} />
        </div>
        <div>
          <h2>{name}</h2>
          <h3>{role}</h3>
        </div>
      </header>
      <div>
        <h3>Bio:</h3>
        {convertString(bio)}
      </div>
      {contact && (
        <div>
          <h3>Contact me:</h3>
          <address>{convertString(contact)}</address>
        </div>
      )}
    </section>
  )
}

export default MemberPage
