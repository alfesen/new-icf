import { Fragment, useState } from 'react'
import { useFormatText } from '../../../../hooks/useFormatText'
import { TAnnouncement } from '../../../../types/HomeTypes'
import Button from '../../../UI/Form/Button/Button'
import s from './Announcement.module.scss'
import Modal from '../../../UI/Modal/Modal'
import AnnouncementsForm from '../../../Forms/AnnouncementsForm/AnnouncementsForm'

const Announcement = ({
  id,
  title,
  description,
  date,
  time,
  onUpdate,
}: TAnnouncement) => {
  const [editModal, setEditModal] = useState<boolean>(false)

  const { highlight } = useFormatText()

  const showEditModal = () => setEditModal(true)

  const closeEditModal = () => setEditModal(false)

  const updateHandler = () => {
    onUpdate()
    closeEditModal()
  }

  return (
    <Fragment>
      {editModal && (
        <Modal
          heading='Edit announcement'
          onDetach={closeEditModal}
          show={editModal}>
          <AnnouncementsForm id={id} onSubmit={updateHandler} />
        </Modal>
      )}
      <li className={s.announcement}>
        <div className={s.announcement__schedule}>
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div className={s.announcement__content}>
          <h3 className={s['announcement__content--title']}>{title}</h3>
          <div>{highlight(description)}</div>
        </div>
        <div className={s.announcement__actions}>
          <Button onClick={showEditModal} type='button'>
            Edit
          </Button>
        </div>
      </li>
    </Fragment>
  )
}

export default Announcement
