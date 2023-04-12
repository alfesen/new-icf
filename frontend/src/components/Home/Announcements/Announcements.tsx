import { useEffect, useState, Fragment } from 'react'
import Card from '../../UI/Card/Card'
import { useFetchData } from '../../../hooks/useFetchData'
import { Announcement as AnnouncementType } from '../../../types/HomeTypes'
import Announcement from './Announcement/Announcement'
import s from './Announcements.module.scss'
import Button from '../../UI/Form/Button/Button'
import Modal from '../../UI/Modal/Modal'
import AnnouncementsForm from '../AnnouncementsForm/AnnouncementsForm'

const Announcements = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
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
    ({ id, title, description, date, time }: AnnouncementType) => {
      const renderDate = new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })

      return (
        <Announcement
          key={`${id}_announcement_type`}
          id={id}
          title={title}
          description={description}
          date={renderDate}
          time={time}
        />
      )
    }
  )

  const showEditModal = () => {
    setShowModal(true)
  }

  const closeEditModal = () => {
    setShowModal(false)
  }

  return (
    <Fragment>
      {showModal && (
        <Modal
          show={showModal}
          onDetach={closeEditModal}
          heading='Edit Announcements'>
          <AnnouncementsForm />
        </Modal>
      )}
      <Card>
        <ul className={s.list}>{renderAnnouncements}</ul>
        <div className={s.list__actions}>
          <Button type='button' onClick={showEditModal}>
            Add
          </Button>
        </div>
      </Card>
    </Fragment>
  )
}

export default Announcements
