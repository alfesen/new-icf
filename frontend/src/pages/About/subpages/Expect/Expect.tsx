import Button from '../../../../components/UI/Form/Button/Button'
import s from './Expect.module.scss'

const Expect = () => {
  return (
    <section className={s.expect}>
      <div className={s.expect__actions}>
        <Button link to='/edit-article/expect'>
          Edit
        </Button>
      </div>
    </section>
  )
}

export default Expect
