import { Link } from 'react-router-dom'
import { ButtonProps } from '../../../../types/UITypes'
import s from './Button.module.scss'

const Button = ({ link, to, onClick, reverse, children }: ButtonProps) => {
  const buttonClass = !reverse ? s.button : `${s.button} ${s.button__reverse}`

  const button = link ? (
    <Link className={buttonClass} to={to!}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  )
  return button
}

export default Button