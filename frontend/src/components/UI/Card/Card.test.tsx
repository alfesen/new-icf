import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from './Card'

describe('Card component', () => {
  it('should render card with additional className if provided', () => {
    render(
      <Card className='test'>
        <h1></h1>
      </Card>
    )
    const card = screen.getByLabelText(/card/i)
    expect(card).toHaveClass('test')
  })

  it('should render card with provided children', () => {
    render(
      <Card>
        <h1></h1>
      </Card>
    )
    const child = screen.getByRole('heading')
    expect(child).toBeInTheDocument()
  })
})
