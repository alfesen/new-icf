import { useEffect, useState, lazy, Suspense } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { useLocation, useParams } from 'react-router-dom'
import { useClientWidth } from '../../../hooks/useClientWidth'
import { THeader } from '../../../types/LayoutTypes'
import { useModal } from '../../../hooks/useModal'
import Button from '../../UI/Form/Button/Button'
import Modal from '../../UI/Modal/Modal'
import LoadingSpinner from '../../UI/UX/LoadingSpinner/LoadingSpinner'
import s from './Header.module.scss'

const HeaderForm = lazy(() => import('../../Forms/HeaderForm/HeaderForm'))

const Header = () => {
  const [headerData, setHeaderData] = useState<THeader>(null)
  const { openModal, closeModal, show } = useModal()
  const { loading, sendRequest } = useFetchData()
  const { pathname } = useLocation()
  const { width } = useClientWidth()
  const { memberId } = useParams()

  useEffect(() => {
    const getHeader = async () => {
      try {
        const { headerData } = await sendRequest(
          `http://localhost:5000/api/${pathname.replaceAll('/', '')}/header`
        )
        setHeaderData(headerData)
      } catch (err) {}
    }
    if (!memberId) {
      getHeader()
    }
  }, [sendRequest, pathname])

  const submitHeader = (data: THeader) => {
    setHeaderData(data)
    closeModal()
  }

  if (memberId) return <></>

  return (
    <header className={s.header}>
      {show && (
        <Modal show={show} heading='Edit header' onDetach={closeModal}>
          <Suspense fallback={<LoadingSpinner />}>
            <HeaderForm
              edit={show && true}
              onClose={closeModal}
              onSubmit={submitHeader}
            />
          </Suspense>
        </Modal>
      )}
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
          <img
            className={s.header__background}
            src={
              headerData
                ? `http://localhost:5000/${
                    width > 700
                      ? headerData.desktopImage
                      : headerData.mobileImage
                  }`
                : ''
            }
            alt='Welcome to ICF'
          />
          <div className={s.header__info}>
            <h1 className={s.header__title}>
              {headerData
                ? headerData.pageTitle
                : 'International Christian Fellowship of Warsaw'}
            </h1>
            {headerData && headerData.pageSubtitle && (
              <h3 className={s.header__subtitle}>{headerData.pageSubtitle}</h3>
            )}
          </div>
        </>
      )}
      {!loading && (
        <Button side onClick={openModal} edit type='button'>
          Edit
        </Button>
      )}
    </header>
  )
}

export default Header
