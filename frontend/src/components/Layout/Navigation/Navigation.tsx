import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Burger from '../../UI/UX/Burger/Burger'
import NavItem from './NavItem/NavItem'
import s from './Navigation.module.scss'
import { about, churchLife, give, contact } from '../../../db/links.json'
import Logo from '../../UI/Assets/Logo/Logo'

const Navigation = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const { memberId, eventId } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    if (isActive) {
      setIsActive(false)
    }
  }, [pathname])

  const toggleNavigation = (isActive: boolean) => {
    setIsActive(isActive)
  }

  const renderNavLinks = [about, churchLife, give, contact].map(
    ({ links, title }) => <NavItem links={links} title={title} />
  )

  return (
    <nav
      className={`${s.nav} ${
        memberId || eventId || pathname.includes('edit') ? s.nav__dark : ''
      }`}>
      <div className={s.nav__inner}>
        <div className={s.nav__logo}>
          <Logo />
        </div>
        <ul className={`${s.nav__links} ${isActive ? s.show : ''}`}>
          {renderNavLinks}
        </ul>
      </div>
      <div className={s.nav__button}>
        <Burger onToggle={toggleNavigation} />
      </div>
    </nav>
  )
}

export default Navigation
