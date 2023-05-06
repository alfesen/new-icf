import { BurgerProps } from '../../../../types/UITypes'
import s from './Burger.module.scss'
import { useState } from 'react'

const Burger = ({ onToggle }: BurgerProps) => {
  const [isActive, setIsActive] = useState(false)

  const toggleBurger = () => {
    setIsActive(is => !is)
    onToggle(!isActive)
  }

  return (
    <button
      onClick={toggleBurger}
      className={`${s.hamburger} ${s['hamburger--spring']} ${
        isActive ? s['is-active'] : ''
      }`}>
      <span className={s['hamburger-box']}>
        <span className={s['hamburger-inner']}></span>
      </span>
    </button>
  )
}

export default Burger
