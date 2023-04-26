import { useState, useEffect } from 'react'
import Modal from '../../UI/Modal/Modal'
import LocationForm from '../LocationForm/LocationForm'
import Button from '../../UI/Form/Button/Button'
import s from './Location.module.scss'
import { useFetchData } from '../../../hooks/useFetchData'
import { LocationData } from '../../../types/AboutTypes'
import LoadingSpinner from '../../UI/UX/LoadingSpinner/LoadingSpinner'

const Location = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [locationData, setLocationData] = useState<LocationData>(null)
  const { loading, sendRequest } = useFetchData()

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { location } = await sendRequest(
          'http://localhost:5000/api/about/location'
        )
        setLocationData(location)
      } catch (err) {}
    }
    getLocation()
  }, [])

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
      {loading && <LoadingSpinner />}
      {!loading && locationData && (
        <div>
          <h3>{locationData?.title}</h3>
          <address>{locationData?.address}</address>
          <img
            src={`http://localhost:5000/${locationData?.image}`}
            alt='Church building'
          />
          <p>{locationData?.directions}</p>
          <iframe
            src={locationData?.map}
            width='600'
            height='450'
            loading='lazy'></iframe>
        </div>
      )}
    </div>
  )
}

export default Location
