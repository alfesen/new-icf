import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from './IconLink.module.scss'
import { IconLinkProps } from '../../../../types/UITypes'

const IconLink = ({ icon, url, className }: IconLinkProps) => {
  return (
    <a className={s.link} target='_blank' href={url}>
      <FontAwesomeIcon className={`${s.link__icon} ${className}`} icon={icon} />
    </a>
  )
}

export default IconLink
