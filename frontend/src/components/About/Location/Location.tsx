import { useState } from 'react'
import Modal from '../../UI/Modal/Modal'
import LocationForm from '../LocationForm/LocationForm'
import Button from '../../UI/Form/Button/Button'
import s from './Location.module.scss'

const Location = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const showEditModal = () => {
    setShowModal(true)
  }

  const closeEditModal = () => setShowModal(false)

  return (
    <div className={s.location}>
      {showModal && (
        <Modal
          show={showModal}
          onDetach={closeEditModal}
          heading='Edit location'>
          <LocationForm onClose={closeEditModal} />
        </Modal>
      )}
      <div className={s.location__actions}>
        <Button edit reverse type='button' onClick={showEditModal}>
          Edit
        </Button>
      </div>
    </div>
  )
}

export default Location
