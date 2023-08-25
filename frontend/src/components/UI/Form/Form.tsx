import Input from './Input/Input'
import { FormProps } from '../../../types/FormTypes'

const Form = ({ container, inputs, submitHandler, children, asHeader }: FormProps) => {
  const renderInputs = () => {
    return inputs.map(input => {
      if (input.element === 'input') {
        return (
          <Input
            element={input.element}
            type={input.type}
            placeholder={input.placeholder}
            control={input.control}
            rules={input.rules}
            name={input.name}
            label={input.label}
            key={crypto.randomUUID()}
          />
        )
      }
      if (input.element === 'textarea') {
        return (
          <Input
            element={input.element}
            type={input.type}
            placeholder={input.placeholder}
            control={input.control}
            rules={input.rules}
            name={input.name}
            label={input.label}
            key={crypto.randomUUID()}
          />
        )
      }
      if (input.element === 'editor') {
        return (
          <Input
            element={input.element}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            control={input.control}
            rules={input.rules}
            key={crypto.randomUUID()}
          />
        )
      }
      if (input.element === 'select') {
        return (
          <Input
            element={input.element}
            name={input.name}
            label={input.label}
            options={input.options}
            control={input.control}
            rules={input.rules}
            key={crypto.randomUUID()}
          />
        )
      }
    })
  }

  return (
    <form
      className={container ? 'container' : undefined}
      onSubmit={submitHandler}>
      {asHeader && asHeader}
      {renderInputs()}
      {children}
    </form>
  )
}

export default Form
