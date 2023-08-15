import { useParams } from 'react-router-dom'
import MemberForm from '../../components/Forms/MemberForm/MemberForm'
import { Helmet } from 'react-helmet'

const EditMember = () => {
  const { memberId } = useParams()
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {`${
            memberId ? 'Edit' : 'Add'
          } Member - International Christian Fellowship of Warsaw`}
        </title>
        <link rel='canonical' href='#' />
      </Helmet>
      <section className='form-page'>
        <h2 className='center'>
          {memberId ? 'Edit member' : 'Add new member'}
        </h2>
        <MemberForm />
      </section>
    </>
  )
}

export default EditMember
