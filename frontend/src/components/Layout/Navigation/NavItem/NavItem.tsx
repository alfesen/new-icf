import { Fragment } from 'react'
import { useClientWidth } from '../../../../hooks/useClientWidth'
import { formatLink } from '../../../../helpers/formatLink'
import NavDropdown from '../NavDropdown/NavDropdown'
import s from './NavItem.module.scss'
import { useOutsideClick } from '../../../../hooks/useOutsideClick'

type Props = {
  title: string
  links?: string[]
}

const NavItem = ({ title, links }: Props) => {
  const { width } = useClientWidth()

  const desktop = width > 700
  let drop = false

  const { ref, visible, setVisible } = useOutsideClick(drop)
  const isDropped = drop ? '-' : `+`
  const parsedLink = formatLink(title)
  const dropdownLinks = visible && links && (
    <NavDropdown links={links} collectionTitle={title} />
  )

  const handleDrop = () => {
    setVisible(drop => !drop)
  }

  const dropdownMedia = desktop ? (
    <p className={s.item__link} onMouseEnter={handleDrop}>
      <span className={s['item__link--span']}>{isDropped}</span>&nbsp;
      {title}
    </p>
  ) : (
    <p className={s.item__link} onClick={handleDrop}>
      <span className={s['item__link--span']}>{isDropped}</span>&nbsp;
      {title}
    </p>
  )

  return (
    <li ref={ref} className={s.item}>
      {links ? (
        <Fragment>
          {dropdownMedia}
          {dropdownLinks}
        </Fragment>
      ) : (
        <a className={s.item__link} href={`/${parsedLink}`}>
          {title}
        </a>
      )}
    </li>
  )
}

export default NavItem
