import { ChangeEvent, useEffect, useState } from 'react'
import { InputProps } from '../../../../types/UITypes'
import s from './Input.module.scss'

const Input = ({
  id,
  element,
  name,
  placeholder,
  rows,
  label,
  onInput,
}: InputProps) => {
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    onInput(id, value)
  }, [id, onInput, value])

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValue(e.target.value)

  const el =
    element === 'input' ? (
      <input
        onChange={changeHandler}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
      />
    ) : (
      <textarea
        onChange={changeHandler}
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
    )

  return (
    <div className={s.input}>
      <label className={s.input__label} htmlFor={id}>{label}</label>
      {el}
    </div>
  )
}

export default Input
