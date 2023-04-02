import { useEffect, useState } from 'react'
import s from './Header.module.scss'
import { useFetchData } from '../../../hooks/useFetchData'
import { useLocation } from 'react-router-dom'
import { useClientWidth } from '../../../hooks/useClientWidth'
import { HeaderData } from '../../../types/LayoutTypes'

const Header = () => {
  const [headerData, setHeaderData] = useState<HeaderData>(null)
  const { loading, sendRequest } = useFetchData()
  const { pathname } = useLocation()
  const { width } = useClientWidth()

  useEffect(() => {
    const getHeader = async () => {
      try {
        const { headerData } = await sendRequest(
          `http://localhost:5000/api${pathname}/header`
        )
        setHeaderData(headerData)
      } catch (err) {}
    }
    getHeader()
  }, [sendRequest])

  return (
    <header className={s.header}>
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
            {headerData.pageSubtitle && <h3 className={s.header__subtitle}>{headerData.pageSubtitle}</h3>}
          </div>
        </>
      )}
    </header>
  )
}

export default Header
