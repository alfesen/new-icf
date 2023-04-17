import { Fragment, useState } from 'react'
import { convertString } from '../../../../helpers/convertString'
import { Announcement as AnnouncementType } from '../../../../types/HomeTypes'
import Button from '../../../UI/Form/Button/Button'
import s from './Announcement.module.scss'
import Modal from '../../../UI/Modal/Modal'
import AnnouncementsForm from '../../AnnouncementsForm/AnnouncementsForm'

const Announcement = ({
  id,
  title,
  description,
  date,
  time,
}: AnnouncementType) => {
  const [editModal, setEditModal] = useState<boolean>(false)

  const showEditModal = () => {
    setEditModal(true)
  }

  const closeEditModal = () => {
    setEditModal(false)
  }

  return (
    <Fragment>
      {editModal && (
        <Modal
          heading='Edit announcement'
          onDetach={closeEditModal}
          show={editModal}>
          <AnnouncementsForm id={id} />
        </Modal>
      )}
      <li className={s.announcement}>
        <div className={s.announcement__schedule}>
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div className={s.announcement__content}>
          <h3 className={s['announcement__content--title']}>{title}</h3>
          <div>{convertString(description)}</div>
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
