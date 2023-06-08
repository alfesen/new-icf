import { useState, useEffect, Fragment, lazy, Suspense } from 'react'
import Modal from '../../UI/Modal/Modal'
import Button from '../../UI/Form/Button/Button'
import s from './Location.module.scss'
import { useFetchData } from '../../../hooks/useFetchData'
import { TLocation } from '../../../types/AboutTypes'
import LoadingSpinner from '../../UI/UX/LoadingSpinner/LoadingSpinner'
import { useModal } from '../../../hooks/useModal'
import { useFormatText } from '../../../hooks/useFormatText'

const LocationForm = lazy(() => import('../../Forms/LocationForm/LocationForm'))

const Location = () => {
  const { openModal, closeModal, show } = useModal()
  const [locationData, setLocationData] = useState<TLocation>(null)
  const { loading, sendRequest } = useFetchData()
  const { highlight } = useFormatText()

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

  const submitHandler = (data: TLocation) => {
    setLocationData(data)
    closeModal()
  }

  return (
    <Fragment>
      {show && (
        <Modal show={show} onDetach={closeModal} heading='Edit location'>
          <Suspense fallback={<LoadingSpinner />}>
            <LocationForm onClose={closeModal} onSubmit={submitHandler} />
          </Suspense>
        </Modal>
      )}
      {loading && <LoadingSpinner />}
      {!loading && locationData && (
        <section className={s.location}>
          <div className={s.location__actions}>
            <Button edit reverse type='button' onClick={openModal}>
              Edit
            </Button>
          </div>
          <h2 className={s.location__title}>{locationData.title}</h2>
          <address className={s.location__address}>
            {highlight(locationData.address)}
          </address>
          <div className={s.location__image}>
            <img
              src={`http://localhost:5000/${locationData.image}`}
              alt='Church building'
            />
          </div>
          <div className={s.location__directions}>
            {highlight(locationData.directions)}
          </div>
          <iframe
            src={locationData.map}
            width='600'
            height='450'
            loading='lazy'></iframe>
        </section>
      )}
      {!loading && !locationData && (
        <Button type='button' onClick={openModal}>
          Add location
        </Button>
      )}
    </Fragment>
  )
}

export default Location
