import { Link } from 'react-router-dom'
import { ButtonProps } from '../../../../types/UITypes'
import s from './Button.module.scss'

const Button = ({
  type,
  link,
  to,
  onClick,
  reverse,
  children,
  edit,
  side,
}: ButtonProps) => {
  const buttonClass = !reverse ? s.button : `${s.button} ${s.button__reverse}`

  const button = link ? (
    <Link className={buttonClass} to={to!}>
      {children}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClass} ${edit ? s.button__edit : ''} ${
        side ? s.side : ''
      }`}>
      {children}
    </button>
  )
  return button
}

export default Button
