import { Link, useParams } from 'react-router-dom'
import { useFormatText } from '../../../../hooks/useFormatText'
import s from './NavDropdown.module.scss'
import { NavDropdownProps } from '../../../../types/UITypes'

const NavDropdown = ({ links, collectionTitle }: NavDropdownProps) => {
  const { formatLink } = useFormatText()
  const { memberId } = useParams()

  const renderLinks =
    links &&
    links.map(({ text, to }) => {
      const parsedLink = formatLink(text)
      const parsedTitle = formatLink(collectionTitle)
      return (
        <Link
          onClick={() => {}}
          className={s.link}
          key={`${text.replaceAll(' ', '')}_link`}
          target={to && '_blank'}
          to={to ? to : `/${parsedTitle}/${parsedLink}`}>
          {text}
        </Link>
      )
    })

  return (
    <div className={`${s.links} ${memberId ? s.links__dark : ''}`}>
      {renderLinks}
    </div>
  )
}

export default NavDropdown
