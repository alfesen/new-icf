import { useState, Fragment } from 'react'
import { useFormatText } from '../../../hooks/useFormatText'
import s from './SideNavigation.module.scss'
import { NavLink } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'
import { SideNav } from '../../../types/LayoutTypes'
import { nanoid } from 'nanoid'

const SideNavigation = ({ links, title }: SideNav) => {
  const [showNav, setShowNav] = useState(false)

  const { formatLink } = useFormatText()

  const renderLinks = links.map(({ text, to }) => {
    const formattedLink = formatLink(text)
    const formattedTitle = formatLink(title)
    const active = ({ isActive }: { isActive: boolean }) =>
      isActive
        ? `${s.active} ${s.link} ${showNav ? s.show : ''}`
        : `${s.link} ${showNav ? s.show : ''}`
    return (
      <NavLink
        key={`${formattedLink}_key_${nanoid()}`}
        className={active}
        target={to && '_blank'}
        to={to ? to : `/${formattedTitle}/${formattedLink}`}>
        {text}
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
          <h3 className={s.aside__title}>{title}</h3>
          {renderLinks}
        </Fragment>
      </div>
    </Fade>
  )
}

export default SideNavigation
