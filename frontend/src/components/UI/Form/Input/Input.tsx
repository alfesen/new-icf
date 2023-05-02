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
  initialValue,
  onInput,
  type,
  options,
}: InputProps) => {
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    onInput(id, value)
  }, [id, onInput, value])

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setValue(e.target.value)

  let el
  if (element === 'input') {
    el = (
      <input
        type={type ? type : 'text'}
        data-testid='input'
        onChange={changeHandler}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
      />
    )
  } else if (element === 'textarea') {
    el = (
      <textarea
        data-testid='textarea'
        onChange={changeHandler}
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
    )
  } else if (element === 'select' && options) {
    el = (
      <select  onChange={changeHandler}>
        {options.map(o => {
          return <option key={`${o}__input_key`} value={o}>{o}</option>
        })}
      </select>
    )
  }

  return (
    <div className={s.input}>
      <label className={s.input__label} htmlFor={id}>
        {label}
      </label>
      {el}
    </div>
  )
}

export default Input
