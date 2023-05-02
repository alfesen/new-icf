import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Member } from '../../types/MemberTypes'
import { useFetchData } from '../../hooks/useFetchData'
import { convertString } from '../../helpers/convertString'
import s from './MemberPage.module.scss'
import Button from '../../components/UI/Form/Button/Button'

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

  const {id, image, name, role, bio, contact } = member

  return (
    <section className={s.member}>
      <header className={s.member__header}>
        <div className={s.member__avatar}>
          <img src={`http://localhost:5000/${image}`} alt={`${name} avatar`} />
        </div>
        <div className={s.member__info}>
          <h2>{name}</h2>
          <h3>{role}</h3>
        </div>
      </header>
      <div className={s.member__bio}>
        <h3>Bio:</h3>
        {convertString(bio)}
      </div>
      {contact && (
        <div className={s.member__contact}>
          <h3>Contact me:</h3>
          <address>{convertString(contact)}</address>
        </div>
      )}
      <div className={s.member__actions}>
        <Button link to={`/staff/edit-member/${id}`}>Edit</Button>
      </div>
    </section>
  )
}

export default MemberPage
