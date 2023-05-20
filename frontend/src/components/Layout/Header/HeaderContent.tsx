import { THeader } from '../../../types/LayoutTypes'
import { useClientWidth } from '../../../hooks/useClientWidth'
import s from './HeaderContent.module.scss'

const HeaderContent = ({ headerData }: { headerData: THeader }) => {
  const { width } = useClientWidth()

  return (
    <>
      <img
        className={s.header__background}
        src={
          headerData
            ? `http://localhost:5000/${
                width > 700 ? headerData.desktopImage : headerData.mobileImage
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
  )
}

export default HeaderContent
