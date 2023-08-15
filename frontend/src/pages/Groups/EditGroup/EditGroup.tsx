import { useParams } from 'react-router-dom'
import GroupForm from '../../../components/Forms/GroupForm/GroupForm'

const Group = () => {
  const { groupId } = useParams()
  return (
    <section className='form-page'>
      <h2 className='center'>{groupId ? 'Edit group' : 'Add new group'}</h2>
      <GroupForm />
    </section>
  )
}

export default Group
