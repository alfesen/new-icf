import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Input from './Input'

describe('Input component', () => {
  const renderInput = (el: 'input' | 'textarea') => {
    const mock = vi.fn()
    const id = '123'
    const name = 'name'
    const placeholder = 'placeholder'
    const label = 'label'

    render(
      <Input
        id={id}
        element={el}
        onInput={mock}
        label={label}
        name={name}
        placeholder={placeholder}
      />
    )

    return { mock, id }
  }

  it('should render the textarea element provided element = "textarea"', () => {
    renderInput('textarea')
    const textarea1 = screen.getByTestId('textarea')
    const input1 = screen.queryByTestId('input')
    expect(textarea1).toBeInTheDocument()
    expect(input1).toBeNull()
  })

  it('should render the input element provided element = "input"', () => {
    renderInput('textarea')
    const textarea1 = screen.getByTestId('textarea')
    const input1 = screen.queryByTestId('input')
    expect(textarea1).toBeInTheDocument()
    expect(input1).toBeNull()
  })

  it('should fire the provided onInput function on input change', async () => {
    const { id, mock } = renderInput('textarea')
    const textarea = screen.getByTestId('textarea')
    await userEvent.click(textarea)
    await userEvent.keyboard('text')
    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledWith(id, 'text')
  })
})
