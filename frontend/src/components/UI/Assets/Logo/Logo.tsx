import s from './Logo.module.scss'
import logo from '../../../../assets/images/logo.png'
import { Link } from 'react-router-dom'

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      className={`${s.logo} ${className}`}
      to='/home'
      title='To the home page'>
      <img
        className={s['logo--img']}
        src={logo}
        alt='International Christian Fellowship logo'
      />
    </Link>
  )
}

export default Logo
