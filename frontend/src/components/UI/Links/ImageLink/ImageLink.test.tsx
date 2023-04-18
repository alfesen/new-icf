import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ImageLink from './ImageLink'

describe('ImageLink component', () => {
  const renderImageLink = () => {
    const testClassName = 'test'
    const testImage = 'image'
    const testText = 'test text'
    render(
      <MemoryRouter>
        <ImageLink
          className={testClassName}
          image={testImage}
          link={testText}
        />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    return { link, testClassName, testImage, testText }
  }

  it('should render link', () => {
    const { link } = renderImageLink()
    expect(link).toBeInTheDocument()
  })

  it('should render link with formatted url href', () => {
    const { link } = renderImageLink()
    const formattedLink = '/test-text'
    expect(link).toHaveAttribute('href', formattedLink)
  })

  it('should render link with additional className if provided', () => {
    const { link, testClassName } = renderImageLink()
    expect(link).toHaveClass(testClassName)
  })

  it('should render link with provided image within', () => {
    const { link, testImage } = renderImageLink()
    const image = within(link).getByRole('img')
    expect(image).toHaveAttribute('src', testImage)
  })

  it('should render link with provided text as alt', () => {
    const { link, testText } = renderImageLink()
    const image = within(link).getByRole('img')
    expect(image).toHaveAttribute('alt', `Go to ${testText}`)
  })

  it('should render heading with provided text inside the link', () => {
    const { link, testText } = renderImageLink()
    const heading = within(link).getByRole('heading')
    expect(heading.textContent).toBe(testText)
  })
})
