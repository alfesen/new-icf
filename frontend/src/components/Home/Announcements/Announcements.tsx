import { useEffect, useState, lazy, Suspense } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { Announcement as AnnouncementType } from '../../../types/HomeTypes'
import Card from '../../UI/Card/Card'
import Announcement from './Announcement/Announcement'
import Button from '../../UI/Form/Button/Button'
import Modal from '../../UI/Modal/Modal'
import LoadingSpinner from '../../UI/UX/LoadingSpinner/LoadingSpinner'
import s from './Announcements.module.scss'

const AnnouncementsForm = lazy(
  () => import('../AnnouncementsForm/AnnouncementsForm')
)

const Announcements = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([])
  const { loading, sendRequest } = useFetchData()

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

  const showEditModal = () => setShowModal(true)

  const closeEditModal = () => setShowModal(false)

  const submitAnnouncement = async () => {
    try {
      const { announcements } = await sendRequest(
        'http://localhost:5000/api/home/announcements'
      )

      setAnnouncements(announcements)
      closeEditModal()
    } catch (err) {}
  }

  const renderAnnouncements = announcements.map(
    ({ id, title, description, date, time }: AnnouncementType) => {
      const renderDate = new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })

      return (
        <Announcement
          onUpdate={submitAnnouncement}
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

  return (
    <section>
      {!announcements && loading && <LoadingSpinner />}
      {showModal && (
        <Modal
          show={showModal}
          onDetach={closeEditModal}
          heading='Edit Announcements'>
          <Suspense fallback={<LoadingSpinner />}>
            <AnnouncementsForm onSubmit={submitAnnouncement} />
          </Suspense>
        </Modal>
      )}
      <Card>
        <ul className={s.list}>{renderAnnouncements}</ul>
        <div className={s.list__actions}>
          <Button reverse type='button' onClick={showEditModal}>
            Add
          </Button>
        </div>
      </Card>
    </section>
  )
}

export default Announcements
