import { useEffect, useState } from 'react'
import { useFetchData } from '../../../../hooks/useFetchData'
import { useFormatText } from '../../../../hooks/useFormatText'
import FallbackSection from '../../../../components/UI/FallbackSection/FallbackSection'
import ImageLink from '../../../../components/UI/Links/ImageLink/ImageLink'
import { TEvent } from '../../../../types/EventsTypes'
import s from './Events.module.scss'
import Button from '../../../../components/UI/Form/Button/Button'
import { Helmet } from 'react-helmet'

const Events = () => {
  const [events, setEvents] = useState<TEvent[]>([])
  const { sendRequest } = useFetchData()
  const { formatDate } = useFormatText()

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

  const renderEvents = events.map(({ id, title, date, image }) => {
    return (
      <ImageLink
        key={`${title}_${id}`}
        to={`/events/${id}`}
        link={title || ''}
        subtitle={formatDate(date)}
        image={`http://localhost:5000/${image}`}
      />
    )
  })

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          Upcoming Events - International Christian Fellowship of Warsaw
        </title>
        <link rel='canonical' href='#' />
      </Helmet>
      <section>
        <h2>Upcoming events</h2>
        <div className={`boxes ${s.events}`}>{renderEvents}</div>
        <div className='align-right'>
          <Button link to='/events/edit-event'>
            Add Event
          </Button>
        </div>
      </section>
    </>
  )
}

export default Events
