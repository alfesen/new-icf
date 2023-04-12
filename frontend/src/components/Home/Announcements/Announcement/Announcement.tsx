import { convertString } from '../../../../helpers/convertString'
import { Announcement as AnnouncementType } from '../../../../types/HomeTypes'
import s from './Announcement.module.scss'

const Announcement = ({ title, description, date, time }: AnnouncementType) => {
  return (
    <li className={s.announcement}>
      <div className={s.announcement__schedule}>
        <p>{date}</p>
        <p>{time}</p>
      </div>
      <div className={s.announcement__content}>
        <h3 className={s['announcement__content--title']}>{title}</h3>
        <div>{convertString(description)}</div>
      </div>
    </li>
  )
}

export default Announcement
