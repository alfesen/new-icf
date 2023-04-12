import { useEffect, useState } from 'react'
import Card from '../../UI/Card/Card'
import { useFetchData } from '../../../hooks/useFetchData'
import { Announcement as AnnouncementType } from '../../../types/HomeTypes'
import Announcement from './Announcement/Announcement'
import s from './Announcements.module.scss'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([])
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

  const renderAnnouncements = announcements.map(
    ({ id, title, description, date, time }: AnnouncementType) => (
      <Announcement
        key={`${id}_announcement_type`}
        id={id}
        title={title}
        description={description}
        date={date}
        time={time}
      />
    )
  )

  return (
    <Card>
      <ul className={s.list}>{renderAnnouncements}</ul>
    </Card>
  )
}

export default Announcements
