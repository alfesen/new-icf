import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import { TEvent } from '../../../types/EventsTypes'
import { useFormatText } from '../../../hooks/useFormatText'

import EventInfo from './EventInfo/EventInfo'
import s from './EventPage.module.scss'
import Button from '../../../components/UI/Form/Button/Button'

const EventPage = () => {
  const [event, setEvent] = useState<TEvent>()
  const { eventId } = useParams()
  const { sendRequest } = useFetchData()
  const { formatDate } = useFormatText()

  useEffect(() => {
    const getEvent = async () => {
      try {
        const { event } = await sendRequest(
          `http://localhost:5000/api/church-life/events/${eventId}`
        )
        setEvent(event)
      } catch (err) {}
    }
    getEvent()
  }, [])

  if (!event) {
    return (
      <section className='center'>
        <h3>No event found</h3>
      </section>
    )
  }

  const { title, content, image, date, time } = event

  return (
    <section className={s.event}>
      <div className='center'>
        <img
          className={s.event__hero}
          src={`http://localhost:5000/${image}`}
          alt={title + 'announcement image'}
        />
      </div>
      <EventInfo
        date={formatDate(date)}
        time={time}
        content={content}
        title={title}
      />
      <div className={`align-right ${s.event__actions}`}>
        <Button link to={`/events/edit-event/${eventId}`}>
          Edit Event
        </Button>
      </div>
    </section>
  )
}

export default EventPage
