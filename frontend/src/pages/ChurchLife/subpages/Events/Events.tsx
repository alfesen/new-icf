import { useEffect, useState } from 'react'
import { useFetchData } from '../../../../hooks/useFetchData'

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
    return <p>No events announced</p>
  }

  return <section></section>
}

export default Events
