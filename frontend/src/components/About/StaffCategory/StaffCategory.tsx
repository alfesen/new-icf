import { TMember, TMemberCategory } from '../../../types/MemberTypes'
import CircleLink from '../../UI/Links/CircleLink/CircleLink'
import s from './StaffCategory.module.scss'

const StaffCategory = ({ category, items }: TMemberCategory) => {
  const renderStaff = items.map(({ id, name, image }: TMember) => {
    return <CircleLink key={name + id} image={image} id={id} name={name} />
  })

  return (
    <div className={s.category}>
      <h3>{category}</h3>
      <hr />
      <div className={s.category__items}>{renderStaff}</div>
    </div>
  )
}

export default StaffCategory
