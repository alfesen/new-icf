import { ChangeEvent } from 'react'
import { useController } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { profanity } from '@2toad/profanity'
import { InputProps } from '../../../../types/FormTypes'
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
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...rules,
      validate: (): string | undefined =>
        profanity.exists(value) ? 'Profanity detected' : undefined,
    },
  })
  const maxLength = rules?.maxLength as { value: number; message: string }

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => onChange(e.target.value)

  const editorChangeHandler = (state: string) => {
    onChange(state)
  }
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
        defaultValue={value}
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
        defaultValue={value}
      />
    )
  } else if (element === 'select' && options) {
    el = (
      <select
        defaultValue={value}
        value={value}
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
  } else if (element === 'editor') {
    const module = {
      toolbar: [
        ['bold', 'italic', 'strike', 'underline', 'link'],
        ['blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
      ],
    }
    el = (
      <ReactQuill
        className={s.input__quill}
        id={name}
        theme='snow'
        modules={module}
        value={value}
        onChange={editorChangeHandler}
        placeholder={placeholder}
      />
    )
  }

  return (
    <div
      className={`${s.input} ${error ? 'invalid' : ''} ${
        rules ? s.input__rules : ''
      }`}>
      <label className={s.input__label} htmlFor={name}>
        {label}
      </label>
      {el}
      {rules && (
        <sub className={s.input__subscript}>
          <p>{error?.message}</p>
          <p>
            {maxLength && `${(value && value.length) | 0}/${maxLength.value}`}
          </p>
        </sub>
      )}
    </div>
  )
}

export default Input
