import { useEffect, useState, lazy, Suspense } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { useLocation, useParams } from 'react-router-dom'
import { THeader } from '../../../types/LayoutTypes'
import { useModal } from '../../../hooks/useModal'
import Button from '../../UI/Form/Button/Button'
import Modal from '../../UI/Modal/Modal'
import LoadingSpinner from '../../UI/UX/LoadingSpinner/LoadingSpinner'
import s from './Header.module.scss'
import HeaderContent from './HeaderContent'

const HeaderForm = lazy(() => import('../../Forms/HeaderForm/HeaderForm'))

const Header = () => {
  const [headerData, setHeaderData] = useState<THeader>(null)
  const { openModal, closeModal, show } = useModal()
  const { loading, sendRequest, error } = useFetchData()
  const { pathname } = useLocation()
  const { memberId, eventId } = useParams()

  useEffect(() => {
    const getHeader = async () => {
      try {
        const { headerData } = await sendRequest(
          `http://localhost:5000/api/${pathname.replaceAll('/', '')}/header`
        )
        setHeaderData(headerData)
      } catch (err) {}
    }
    if (!memberId && !eventId && !pathname.includes('edit')) {
      getHeader()
    }
  }, [pathname])

  const submitHeader = async () => {
    try {
      const { headerData } = await sendRequest(
        `http://localhost:5000/api/${pathname.replaceAll('/', '')}/header`
      )
      setHeaderData(headerData)
      closeModal()
    } catch (err) {}
  }

  if (memberId || eventId || pathname.includes('edit')) return <></>

  return (
    <header className={`jcc-aic ${s.header}`}>
      {show && (
        <Modal show={show} heading='Edit header' onDetach={closeModal}>
          <Suspense fallback={<LoadingSpinner />}>
            <HeaderForm
              onClose={closeModal}
              onSubmit={() => setTimeout(submitHeader, 500)}
            />
          </Suspense>
        </Modal>
      )}
      {loading && <LoadingSpinner />}
      {!loading && !error && <HeaderContent headerData={headerData} />}
      {!loading && (
        <Button side onClick={openModal} edit type='button'>
          Edit
        </Button>
      )}
    </header>
  )
}

export default Header
