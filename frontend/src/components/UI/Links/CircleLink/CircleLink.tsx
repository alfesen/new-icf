import {Link} from 'react-router-dom'
import s from './CircleLink.module.scss'

const CircleLink = () => {
  return (
    <Link className={s.link} to=''>
      <img src="https://images.pexels.com/photos/12903578/pexels-photo-12903578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className={s.link__image} />
      <div className={s.link__name}>
        <p>Scott Parmenter</p>
      </div>
    </Link>
  )
}

export default CircleLink