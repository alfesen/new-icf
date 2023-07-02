import { useEffect, useState } from 'react'
import { useFetchData } from '../../../../hooks/useFetchData'
import Button from '../../../../components/UI/Form/Button/Button'
import FallbackSection from '../../../../components/UI/FallbackSection/FallbackSection'

const Events = () => {
  const [events, setEvents] = useState([])

  const { sendRequest } = useFetchData()

  useEffect(() => {
    const fetchEvents = async () => {
      const { events } = await sendRequest(
        'http://localhost:5500/api/church-life/events'
      )
      setEvents(events)
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

  return <section></section>
}

export default Events
