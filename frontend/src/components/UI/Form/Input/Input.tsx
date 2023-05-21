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
  const maxLength = rules?.maxLength as { value: number; message: string }

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
      <select
        defaultValue={field.value}
        value={field.value}
        id={name}
        onChange={changeHandler}>
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
    <div
      className={`${s.input} ${error ? s.input__invalid : ''} ${
        rules ? s.input__rules : ''
      }`}>
      <label className={s.input__label} htmlFor={name}>
        {label}
      </label>
      {el}
      {rules && (
        <sub className={s.input__subscript}>
          <p className={s.input__error}>{error?.message}</p>
          <p className={error ? s.input__error : ''}>
            {maxLength &&
              `${(field.value && field.value.length) | 0}/${maxLength.value}`}
          </p>
        </sub>
      )}
    </div>
  )
}

export default Input
