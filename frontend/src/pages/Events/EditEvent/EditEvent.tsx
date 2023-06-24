import { useParams } from 'react-router-dom'
import EventForm from '../../../components/Forms/EventForm/EventForm'

const EditEvent = () => {
  const { eventId } = useParams()
  return (
    <section className='form-page'>
      <h2 className='center'>{eventId ? 'Edit event' : 'Add new event'}</h2>
      <EventForm />
    </section>
  )
}

export default EditEvent
