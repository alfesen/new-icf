import { useParams } from 'react-router-dom'
import MemberForm from '../../components/Forms/MemberForm/MemberForm'

const EditMember = () => {
  const { memberId } = useParams()
  return (
    <section className='form-page'>
      <h2 className='center'>{memberId ? 'Edit member' : 'Add new member'}</h2>
      <MemberForm />
    </section>
  )
}

export default EditMember
