import s from './Avatar.module.scss'

const Avatar = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className={s.avatar}>
      <img
        className={s.avatar__image}
        src={`http://localhost:5000/${image}`}
        alt={`${name} avatar`}
      />
    </div>
  )
}

export default Avatar
