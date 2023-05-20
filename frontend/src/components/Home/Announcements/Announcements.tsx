import { useEffect, useState, lazy, Suspense } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { TAnnouncement  } from '../../../types/HomeTypes'
import Card from '../../UI/Card/Card'
import Announcement from './Announcement/Announcement'
import Button from '../../UI/Form/Button/Button'
import Modal from '../../UI/Modal/Modal'
import LoadingSpinner from '../../UI/UX/LoadingSpinner/LoadingSpinner'
import s from './Announcements.module.scss'
import { useModal } from '../../../hooks/useModal'

const AnnouncementsForm = lazy(
  () => import('../../Forms/AnnouncementsForm/AnnouncementsForm')
)

const Announcements = () => {
  const { openModal, closeModal, show } = useModal()
  const [announcements, setAnnouncements] = useState<TAnnouncement[]>([])
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

  const submitAnnouncement = async () => {
    try {
      const { announcements } = await sendRequest(
        'http://localhost:5000/api/home/announcements'
      )

      setAnnouncements(announcements)
      closeModal()
    } catch (err) {}
  }

  const renderAnnouncements = announcements.map(
    ({ id, title, description, date, time }: TAnnouncement) => {
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
      {show && (
        <Modal show={show} onDetach={closeModal} heading='Edit Announcements'>
          <Suspense fallback={<LoadingSpinner />}>
            <AnnouncementsForm onSubmit={submitAnnouncement} />
          </Suspense>
        </Modal>
      )}
      <Card>
        <ul className={s.list}>{renderAnnouncements}</ul>
        <div className={s.list__actions}>
          <Button reverse type='button' onClick={openModal}>
            Add
          </Button>
        </div>
      </Card>
    </section>
  )
}

export default Announcements
