import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TMember } from '../../types/MemberTypes'
import { useFetchData } from '../../hooks/useFetchData'
import { convertString } from '../../helpers/convertString'
import s from './MemberPage.module.scss'
import Button from '../../components/UI/Form/Button/Button'
import MemberHeader from '../../components/Layout/MemberHeader/MemberHeader'

const MemberPage = () => {
  const [member, setMember] = useState<TMember>()
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

  const { id, image, name, role, bio, contact } = member

  return (
    <section className={s.member}>
      <MemberHeader image={image} name={name} role={role}/>
      <div className={s.member__bio}>
        <h3>Bio:</h3>
        {convertString(bio)}
      </div>
      {contact && (
        <div className={s.member__contact}>
          <h3>Contact me:</h3>
          <address>{convertString(contact, true)}</address>
        </div>
      )}
      <div className={s.member__actions}>
        <Button link to={`/staff/edit-member/${id}`}>
          Edit
        </Button>
      </div>
    </section>
  )
}

export default MemberPage
