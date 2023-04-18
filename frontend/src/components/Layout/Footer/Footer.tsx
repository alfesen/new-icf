import s from './Footer.module.scss'
import IconLink from '../../UI/Links/IconLink/IconLink'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons'
import { Fade } from 'react-awesome-reveal'

const Footer = () => {
  const iconLinks = [
    { icon: faEnvelope, url: 'mailto:icf@icfwarsaw.org' },
    { icon: faInstagramSquare, url: 'https://www.instagram.com/icf_warsaw_/' },
    { icon: faFacebookSquare, url: 'https://www.facebook.com/ICFWarsaw/' },
  ]

  const renderIcons = iconLinks.map(link => {
    return (
      <IconLink key={iconLinks.indexOf(link)} icon={link.icon} url={link.url} />
    )
  })

  return (
    <footer className={s.footer}>
      <div className='container'>
        <Fade>
          <div className={s.footer__social}>{renderIcons}</div>
          <a href='' className={s.footer__rodo}>
            ICFWarsaw Privacy Policy & RODO
          </a>
        </Fade>
        <hr />
        <div className={s.footer__essentials}>
          <p className={s['footer__essentials--address']}>
            International Christian Fellowship, 326 Puławska, Warszawa,
            mazowieckie, 02-845, Poland
          </p>
          <div className={s['footer__essentials--join']}>
            <h2 className={s['footer__essentials--join-time']}>
              Join us Sundays at 10:00am
            </h2>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
