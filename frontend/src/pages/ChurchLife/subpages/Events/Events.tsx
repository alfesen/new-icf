import { useEffect, useState } from 'react'
import { useFetchData } from '../../../../hooks/useFetchData'
import FallbackSection from '../../../../components/UI/FallbackSection/FallbackSection'
import ImageLink from '../../../../components/UI/Links/ImageLink/ImageLink'
import { TEvent } from '../../../../types/EventsTypes'
import s from './Events.module.scss'

const Events = () => {
  const [events, setEvents] = useState<TEvent[]>([])

  const { sendRequest } = useFetchData()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { events } = await sendRequest(
          'http://localhost:5000/api/church-life/events'
        )
        setEvents(events)
      } catch {}
    }
    fetchEvents()
  }, [])

  if (!events || !events.length) {
    return (
      <FallbackSection
        heading='No events announced'
        link='/events/edit-event'
        linkText='Add event'
      />
    )
  }

  return (
    <section>
      <h2>Upcoming events</h2>
      <div className={`boxes ${s.events}`}>
        {events.map(e => {
          return (
            <ImageLink
              key={`${e.title}_${e.id}`}
              to={`/events/${e.id}`}
              link={e.title || ''}
              image={`http://localhost:5000/${e.image}`}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Events
