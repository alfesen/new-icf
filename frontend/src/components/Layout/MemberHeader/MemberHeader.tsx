import { TMemberHeader } from "../../../types/LayoutTypes"
import Avatar from "../../UI/UX/Avatar/Avatar"
import s from './MemberHeader.module.scss'

const MemberHeader = ({image, name, role}: TMemberHeader) => {
  return (
    <header className={s.header}>
      <Avatar image={image} name={name} />
      <div className={s.header__info}>
        <h2>{name}</h2>
        <h3>{role}</h3>
      </div>
    </header>
  )
}

export default MemberHeader
