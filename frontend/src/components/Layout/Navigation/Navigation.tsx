import { Fragment, useState } from 'react'
import Burger from '../../UI/UX/Burger/Burger'
import NavItem from './NavItem/NavItem'
import s from './Navigation.module.scss'
import { about, churchLife, give } from '../../../db/links.json'

const Navigation = () => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const toggleNavigation = (isActive: boolean) => {
    setIsActive(is => (isActive === true ? true : false))
  }

  return (
    <Fragment>
      <div className={s.nav__button}>
        <Burger onToggle={toggleNavigation} />
      </div>
      <nav className={`${s.nav} ${isActive ? s.show : ''}`}>
        <ul className={s.nav__links}>
          <NavItem links={about.links} title={about.title} />
          <NavItem links={churchLife.links} title={churchLife.title} />
          <NavItem links={give.links} title={give.title} />
        </ul>
      </nav>
    </Fragment>
  )
}

export default Navigation
