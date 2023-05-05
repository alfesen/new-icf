import { useLayoutEffect, useState } from 'react'
import s from './Header.module.scss'
import { useFetchData } from '../../../hooks/useFetchData'
import { useLocation, useParams } from 'react-router-dom'
import { useClientWidth } from '../../../hooks/useClientWidth'
import { HeaderData } from '../../../types/LayoutTypes'
import Button from '../../UI/Form/Button/Button'
import Modal from '../../UI/Modal/Modal'
import HeaderForm from './HeaderForm/HeaderForm'
import LoadingSpinner from '../../UI/UX/LoadingSpinner/LoadingSpinner'

const Header = () => {
  const [headerData, setHeaderData] = useState<HeaderData>(null)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const { loading, sendRequest } = useFetchData()
  const { pathname } = useLocation()
  const { width } = useClientWidth()
  const { memberId } = useParams()

  useLayoutEffect(() => {
    const getHeader = async () => {
      try {
        const { headerData } = await sendRequest(
          `http://localhost:5000/api/${pathname.replaceAll('/', '')}/header`
        )
        setHeaderData(headerData)
      } catch (err) {}
    }
    getHeader()
  }, [sendRequest, pathname])

  const showModal = () => {
    setShowEditModal(true)
  }
  const closeModal = () => {
    setShowEditModal(false)
  }

  if (!headerData) {
    if (memberId) {
      return <></>
    }
    return (
      <div className={`center ${s.header__fallback}`}>
        <Button onClick={showModal}>Add header</Button>
        {showEditModal && (
          <Modal
            show={showEditModal}
            heading='Edit header'
            onDetach={closeModal}>
            <HeaderForm edit={showEditModal && true} onClose={closeModal} />
          </Modal>
        )}
      </div>
    )
  }

  return (
    <header className={s.header}>
      {showEditModal && (
        <Modal show={showEditModal} heading='Edit header' onDetach={closeModal}>
          <HeaderForm edit={showEditModal && true} onClose={closeModal} />
        </Modal>
      )}
      {loading && <LoadingSpinner />}
      {!loading && headerData && (
        <>
          <img
            className={s.header__background}
            src={`http://localhost:5000/${
              width > 700 ? headerData.desktopImage : headerData.mobileImage
            }`}
            alt='Welcome to ICF'
          />
          <div className={s.header__info}>
            <h1 className={s.header__title}>{headerData.pageTitle}</h1>
            {headerData.pageSubtitle && (
              <h3 className={s.header__subtitle}>{headerData.pageSubtitle}</h3>
            )}
          </div>
        </>
      )}
      {!loading && (
        <Button side onClick={showModal} edit type='button'>
          Edit
        </Button>
      )}
    </header>
  )
}

export default Header
