import { Link } from 'react-router-dom'
import s from './CircleLink.module.scss'
import { CircleLinkProps } from '../../../../types/UITypes'

const CircleLink = ({ image, name, id }: CircleLinkProps) => {
  return (
    <Link className={s.link} to={`/staff/${id}`}>
      <img src={image} alt={`${name} bio link`} className={s.link__image} />
      <div className={s.link__name}>
        <p>{name}</p>
      </div>
    </Link>
  )
}

export default CircleLink
