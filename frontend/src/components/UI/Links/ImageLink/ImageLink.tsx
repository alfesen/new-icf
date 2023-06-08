import { useFormatText } from '../../../../hooks/useFormatText'
import { ImageLinkProps } from '../../../../types/UITypes'
import s from './ImageLink.module.scss'
import { Link } from 'react-router-dom'

const ImageLink = ({ className, image, link }: ImageLinkProps) => {
 
  const { formatLink } = useFormatText()

  return (
    <Link to={`/${formatLink(link)}`} className={`${s.link} ${className}`}>
      <div className={s.link__img}>
        <img src={image} alt={`Go to ${link}`} />
        <div className={s.link__overlay}>
          <h3 className={s.link__text}>{link}</h3>
        </div>
      </div>
    </Link>
  )
}

export default ImageLink
