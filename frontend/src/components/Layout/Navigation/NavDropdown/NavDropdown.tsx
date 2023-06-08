import { Link, useParams } from 'react-router-dom'
import { useFormatText } from '../../../../hooks/useFormatText'
import s from './NavDropdown.module.scss'

const NavDropdown = ({
  links,
  collectionTitle,
}: {
  links: string[]
  collectionTitle: string
}) => {
  const { formatLink } = useFormatText()
  const { memberId } = useParams()

  const renderLinks =
    links &&
    links.map(link => {
      const parsedLink = formatLink(link)
      const parsedTitle = formatLink(collectionTitle)
      return (
        <Link
          onClick={() => {}}
          className={s.link}
          key={`${link.replaceAll(' ', '')}_link`}
          to={`/${parsedTitle}/${parsedLink}`}>
          {link}
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
