import { CardProps } from '../../../types/UITypes'
import s from './Card.module.scss'

const Card = ({ className, children }: CardProps) => {
  return <div className={`${className} ${s.card}`}>{children}</div>
}

export default Card
