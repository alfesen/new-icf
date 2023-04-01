import { render, screen } from '@testing-library/react'
import { it, expect, describe, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Button from './Button'

describe('Button component', () => {
  const renderButton = (link: boolean = false, reverse: boolean = false) => {
    const mock = vi.fn()
    const btnText = 'Button'
    const linkText = 'Link'
    link === false &&
      render(
        <Button onClick={mock} reverse={reverse} type='button'>
          {btnText}
        </Button>
      )
    link === true &&
      render(
        <MemoryRouter>
          <Button link to='/'>
            {linkText}
          </Button>
        </MemoryRouter>
      )

    return { mock, btnText, linkText }
  }

  it('should render a button and not a link if link prop is falsy', () => {
    renderButton()
    const button = screen.getByRole('button')
    const link = screen.queryByRole('link')
    expect(button).toBeInTheDocument()
    expect(link).toBeNull()
  })

  it('should render a link and not a button if link prop is truthy', () => {
    renderButton(true)
    const button = screen.queryByRole('button')
    const link = screen.getByRole('link')
    expect(button).toBeNull()
    expect(link).toBeInTheDocument()
  })

  it('should fire provided onClick function if button is clicked', async () => {
    const { mock } = renderButton()
    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(mock).toHaveBeenCalled()
  })

  it('should render a button with reverse class if reverse prop is truthy', () => {
    renderButton(false, true)
    const button = screen.getByRole('button')
    const hasClass = button.className.includes('reverse')
    expect(hasClass).toBeTruthy()
  })

  it('should NOT render a button with reverse class if reverse prop is falsy', () => {
    renderButton()
    const button = screen.getByRole('button')
    const hasClass = button.className.includes('reverse')
    expect(hasClass).toBeFalsy()
  })

  it('should render elements with provided children', () => {
    const { btnText } = renderButton()
    const button = screen.getByText(btnText)
    expect(button).toBeInTheDocument()
    const {linkText} = renderButton(true)
    const link = screen.getByText(linkText)
    expect(link).toBeInTheDocument()
  })
})
