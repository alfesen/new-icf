import { useFormatText } from '../../../../hooks/useFormatText'
import { ImageLinkProps } from '../../../../types/UITypes'
import s from './ImageLink.module.scss'
import { Link } from 'react-router-dom'

const ImageLink = ({
  className,
  image,
  link,
  subtitle,
  to,
}: ImageLinkProps) => {
  const { formatLink } = useFormatText()

  return (
    <Link
      to={to ? to : `/${formatLink(link)}`}
      className={`${s.link} ${className}`}>
      <div className={s.link__img}>
        <img loading='lazy' src={image} alt={`Go to ${link}`} />
        <div className={`jcc-aic ${s.link__overlay}`}>
          <span className={`${s.link__text}`}>
            {link}{' '}
            {subtitle && (
              <>
                <br /> <small>{subtitle}</small>
              </>
            )}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ImageLink
