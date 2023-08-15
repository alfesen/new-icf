import { useParams } from 'react-router-dom'
import EventForm from '../../../components/Forms/EventForm/EventForm'
import { Helmet } from 'react-helmet'

const EditEvent = () => {
  const { eventId } = useParams()
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {`${
            eventId ? 'Edit' : 'Add'
          } Event - International Christian Fellowship of Warsaw`}
        </title>
        <link rel='canonical' href='#' />
      </Helmet>
      <section className='form-page'>
        <h2 className='center'>{eventId ? 'Edit event' : 'Add new event'}</h2>
        <EventForm />
      </section>
    </>
  )
}

export default EditEvent
