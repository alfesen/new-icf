import { useEffect, useState } from 'react'
import Card from '../../UI/Card/Card'
import { useFetchData } from '../../../hooks/useFetchData'
import { Announcement } from '../../../types/HomeTypes'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const { sendRequest } = useFetchData()

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const { announcements } = await sendRequest(
          'http://localhost:5000/api/home/announcements'
        )

        setAnnouncements(announcements)
      } catch (err) {}
    }
    getAnnouncements()
  }, [sendRequest])

  return <Card>Announcements</Card>
}

export default Announcements
