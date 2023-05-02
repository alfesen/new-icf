import { useState, Fragment } from 'react'
import s from './SideNavigation.module.scss'
import { NavLink } from 'react-router-dom'
import { formatLink } from '../../helpers/formatLink'
import { Fade } from 'react-awesome-reveal'
import { SideNav } from '../../types/LayoutTypes'

const SideNavigation = ({ links, collectionTitle, title }: SideNav) => {
  const [showNav, setShowNav] = useState(false)

  const renderLinks = links.map(link => {
    const formattedLink = formatLink(link)
    const formattedTitle = formatLink(collectionTitle)
    const active = ({ isActive }: { isActive: boolean }) =>
      isActive
        ? `${s.active} ${s.link} ${showNav ? s.show : ''}`
        : `${s.link} ${showNav ? s.show : ''}`
    return (
      <NavLink
        key={`${formattedLink}_key_${Math.random()}`}
        className={active}
        to={`/${formattedTitle}/${formattedLink}`}>
        {link}
      </NavLink>
    )
  })

  const buttonSymbol = showNav ? '-' : '+'
  const buttonText = showNav ? 'Hide' : 'Show'

  const toggleNavigation = () => {
    setShowNav(show => !show)
  }

  return (
    <Fade triggerOnce>
      <div className={s.aside}>
        <button onClick={toggleNavigation} className={s.aside__button}>
          <span>{buttonSymbol}</span> {buttonText} navigation
        </button>
        <Fragment>
          <h3 className={s.aside__title}>{title ? title : collectionTitle}</h3>
          {renderLinks}
        </Fragment>
      </div>
    </Fade>
  )
}

export default SideNavigation
