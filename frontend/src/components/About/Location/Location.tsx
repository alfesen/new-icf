import { useState, useEffect, Fragment } from 'react'
import Modal from '../../UI/Modal/Modal'
import LocationForm from '../LocationForm/LocationForm'
import Button from '../../UI/Form/Button/Button'
import s from './Location.module.scss'
import { useFetchData } from '../../../hooks/useFetchData'
import { LocationData } from '../../../types/AboutTypes'
import LoadingSpinner from '../../UI/UX/LoadingSpinner/LoadingSpinner'
import { convertString } from '../../../helpers/convertString'

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
    <Fragment>
      {showModal && (
        <Modal
          show={showModal}
          onDetach={closeEditModal}
          heading='Edit location'>
          <LocationForm onClose={closeEditModal} />
        </Modal>
      )}
      {loading && <LoadingSpinner />}
      {!loading && locationData && (
        <section className={s.location}>
          <div className={s.location__actions}>
            <Button edit reverse type='button' onClick={showEditModal}>
              Edit
            </Button>
          </div>
          <h2 className={s.location__title}>{locationData.title}</h2>
          <address className={s.location__address}>{convertString(locationData.address)}</address>
          <div className={s.location__image}>
            <img
              src={`http://localhost:5000/${locationData.image}`}
              alt='Church building'
            />
          </div>
          <div className={s.location__directions}>{convertString(locationData.directions)}</div>
          <iframe
            src={locationData.map}
            width='600'
            height='450'
            loading='lazy'></iframe>
        </section>
      )}
    </Fragment>
  )
}

export default Location
