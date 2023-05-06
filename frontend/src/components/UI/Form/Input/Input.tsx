import { ChangeEvent } from 'react'
import { useController } from 'react-hook-form'
import { InputProps } from '../../../../types/UITypes'
import s from './Input.module.scss'

const Input = ({
  element,
  name,
  placeholder,
  rows,
  label,
  type,
  options,
  control,
  rules,
}: InputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules })

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => field.onChange(e.target.value)

  let el

  if (element === 'input') {
    el = (
      <input
        type={type ? type : 'text'}
        data-testid='input'
        onChange={changeHandler}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={field.value}
      />
    )
  } else if (element === 'textarea') {
    el = (
      <textarea
        data-testid='textarea'
        onChange={changeHandler}
        id={name}
        name={name}
        placeholder={placeholder}
        rows={rows}
        defaultValue={field.value}
      />
    )
  } else if (element === 'select' && options) {
    el = (
      <select defaultValue={field.value} id={name} onChange={changeHandler}>
        {options.map(o => {
          return (
            <option key={`${o}__input_key`} value={o}>
              {o}
            </option>
          )
        })}
      </select>
    )
  }

  return (
    <div className={s.input}>
      <label className={s.input__label} htmlFor={name}>
        {label}
      </label>
      {el}
      <sub>{error?.message}</sub>
    </div>
  )
}

export default Input
