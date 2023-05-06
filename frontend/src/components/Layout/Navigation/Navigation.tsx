import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Burger from '../../UI/UX/Burger/Burger'
import NavItem from './NavItem/NavItem'
import s from './Navigation.module.scss'
import { about, churchLife, give } from '../../../db/links.json'
import Logo from '../../UI/Assets/Logo/Logo'

const Navigation = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const { memberId } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    if (isActive) {
      setIsActive(false)
    }
  }, [pathname])

  const toggleNavigation = (isActive: boolean) => {
    setIsActive(isActive)
  }

  return (
    <div className={`${s.nav} ${memberId ? s.nav__dark : ''}`}>
      <div className={s.nav__logo}>
        <Logo />
      </div>
      <div className={s.nav__button}>
        <Burger onToggle={toggleNavigation} />
      </div>
      <nav className={`${s.nav__inner} ${isActive ? s.show : ''} `}>
        <ul className={s.nav__links}>
          <NavItem links={about.links} title={about.title} />
          <NavItem links={churchLife.links} title={churchLife.title} />
          <NavItem links={give.links} title={give.title} />
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
