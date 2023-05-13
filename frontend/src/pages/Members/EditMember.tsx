import { useParams } from 'react-router-dom'
import MemberForm from '../../components/Forms/MemberForm/MemberForm'
import s from './EditMember.module.scss'

const EditMember = () => {
  const { memberId } = useParams()
  return (
    <section className={s.new__member}>
      <h2 className='center'>{memberId ? 'Edit member' : 'Add new member'}</h2>
      <MemberForm />
    </section>
  )
}

export default EditMember
