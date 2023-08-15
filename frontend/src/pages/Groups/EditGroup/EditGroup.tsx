import { useParams } from 'react-router-dom'
import GroupForm from '../../../components/Forms/GroupForm/GroupForm'
import { Helmet } from 'react-helmet'

const Group = () => {
  const { groupId } = useParams()
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {`${
            groupId ? 'Edit' : 'Add'
          } Group - International Christian Fellowship of Warsaw`}
        </title>
        <link rel='canonical' href='#' />
      </Helmet>
      <section className='form-page'>
        <h2 className='center'>{groupId ? 'Edit group' : 'Add new group'}</h2>
        <GroupForm />
      </section>
    </>
  )
}

export default Group
