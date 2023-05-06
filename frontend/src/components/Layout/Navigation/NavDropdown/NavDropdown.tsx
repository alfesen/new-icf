import s from './NavDropdown.module.scss'
import { formatLink } from '../../../../helpers/formatLink'
import { Link } from 'react-router-dom'

const NavDropdown = ({ links, collectionTitle }: { links: string[], collectionTitle: string}) => {
  const renderLinks =
    links &&
    links.map(link => {
      const parsedLink = formatLink(link)
      const parsedTitle = formatLink(collectionTitle)
      return (
        <Link
          className={s.link}
          key={`${link.replaceAll(' ', '')}_link`}
          to={`/${parsedTitle}/${parsedLink}`}>
          {link}
        </Link>
      )
    })

  return <div className={s.links}>{renderLinks}</div>
}

export default NavDropdown
