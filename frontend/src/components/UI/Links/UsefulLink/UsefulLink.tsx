import { Link } from 'react-router-dom'
import s from './UsefulLink.module.scss'
import { UsefulLinkProps } from '../../../../types/UITypes'

const UsefulLink = ({ image, text, url }: UsefulLinkProps) => {
  return (
    <div className={s.link}>
      <div className={s.link__text}>{text}</div>
      <Link to={url}>
        <img className={s.link__img} src={image} alt={`${text} image link`} />
      </Link>
    </div>
  )
}

export default UsefulLink
