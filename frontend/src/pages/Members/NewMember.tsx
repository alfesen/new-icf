import MemberForm from '../../components/About/MemberForm/MemberForm'
import s from './NewMember.module.scss'

const NewMember = () => {
  return (
    <section className={s.new__member}>
      <h2 className='center'>Add new member</h2>
      <MemberForm />
    </section>
  )
}

export default NewMember