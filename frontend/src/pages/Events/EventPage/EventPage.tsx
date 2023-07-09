import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
import { TEvent } from '../../../types/EventsTypes'

const EventPage = () => {
  const [event, setEvent] = useState<TEvent>()
  const { eventId } = useParams()
  const { sendRequest } = useFetchData()

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

  return <div>EventPage</div>
}

export default EventPage
