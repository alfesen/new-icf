import { convertString } from '../../../../helpers/convertString'
import { Announcement as AnnouncementType } from '../../../../types/HomeTypes'

const Announcement = ({ title, description, date, time }: AnnouncementType) => {
  return (
    <li>
      <div>
        <p>{date}</p>
        <p>{time}</p>
      </div>
      <div>
        <h3>{title}</h3>
        <div>{convertString(description)}</div>
      </div>
    </li>
  )
}

export default Announcement
