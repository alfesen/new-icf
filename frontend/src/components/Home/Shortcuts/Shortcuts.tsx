import ImageLink from '../../../components/UI/Links/ImageLink/ImageLink'
import s from './Shortcuts.module.scss'
import { nanoid } from 'nanoid'
import events from '../../../assets/images/links/events-sm.webp'
import group from '../../../assets/images/links/group-sm.webp'
import sermon from '../../../assets/images/links/sermon-sm.webp'
import contact from '../../../assets/images/links/contact-sm.webp'

const Shortcuts = () => {
  const linksData = [
    { image: events, name: 'Upcoming events' },
    { image: group, name: 'Small groups' },
    { image: sermon, name: 'Sermons' },
    { image: contact, name: 'Contact' },
  ]

  const renderLinks = linksData.map(link => {
    return (
      <ImageLink
        key={`${link.name}_${nanoid()}`}
        image={link.image}
        link={link.name}
      />
    )
  })

  return <section className={`boxes ${s.shortcuts}`}>{renderLinks}</section>
}

export default Shortcuts
