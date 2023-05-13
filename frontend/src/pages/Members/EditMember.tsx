import MemberForm from '../../components/Forms/MemberForm/MemberForm'
import s from './EditMember.module.scss'

const EditMember = () => {
  return (
    <section className={s.new__member}>
      <h2 className='center'>Add new member</h2>
      <MemberForm />
    </section>
  )
}

export default EditMember