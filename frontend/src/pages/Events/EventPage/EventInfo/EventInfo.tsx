import { useFormatText } from '../../../../hooks/useFormatText'
import { TEventInfo } from '../../../../types/EventsTypes'
import s from './EventInfo.module.scss'

const EventInfo = ({ title, date, time, content }: TEventInfo) => {
  const { transform } = useFormatText()
  return (
    <div className={s.info}>
      <div className={s.info__header}>
        <h2>{title}</h2>
        <p>
          {date} {time}
        </p>
      </div>
      <div className={s.info__content}>{transform(content)}</div>
    </div>
  )
}

export default EventInfo
