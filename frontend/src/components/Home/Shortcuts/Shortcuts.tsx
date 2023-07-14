import ImageLink from '../../../components/UI/Links/ImageLink/ImageLink'
import s from './Shortcuts.module.scss'
import { nanoid } from 'nanoid'
import events from '../../../assets/images/links/events-sm.webp'
import group from '../../../assets/images/links/group-sm.webp'
import sermon from '../../../assets/images/links/sermon-sm.webp'
import contact from '../../../assets/images/links/contact-sm.webp'

const Shortcuts = () => {
  const linksData = [
    {
      image: events,
      name: 'Upcoming events',
      to: '/church-life/upcoming-events',
    },
    { image: group, name: 'Small groups', to: '/' },
    { image: sermon, name: 'Sermons', to: '/' },
    { image: contact, name: 'Contact', to: '/' },
  ]

  const renderLinks = linksData.map(link => {
    return (
      <ImageLink
        key={`${link.name}_${nanoid()}`}
        image={link.image}
        to={link.to}
        link={link.name}
      />
    )
  })

  return <section className={`boxes ${s.shortcuts}`}>{renderLinks}</section>
}

export default Shortcuts
