import { Link } from 'react-router-dom'
import s from './Navigation.module.scss'
import Burger from '../../UI/UX/Burger/Burger'
import { Fragment, useState } from 'react'

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
          <li className={s.nav__link}>
            <Link to='/about'>About us</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  )
}

export default Navigation
