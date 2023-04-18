import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import UsefulLink from './UsefulLink'

describe('UsefulLink component', () => {
  const renderUsefulLink = () => {
    const testImage = 'test image'
    const testText = 'test text'
    const testUrl = 'http://localhost:5173'
    render(
      <MemoryRouter>
        <UsefulLink image={testImage} text={testText} url={testUrl} />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    const image = within(link).getByRole('img')
    return { link, image, testImage, testText, testUrl }
  }

  it('should render text provided via props', () => {
    const { testText } = renderUsefulLink()
    const linkText = screen.getByText(testText)
    expect(linkText).toBeInTheDocument()
  })

  it('should render link with url provided via props', () => {
    const { link, testUrl } = renderUsefulLink()
    expect(link).toHaveAttribute('href', testUrl)
  })

  it('should render image within a link', () => {
    const { image } = renderUsefulLink()
    expect(image).toBeInTheDocument()
  })

  it('should render image with an alt text of "{text} image link"', () => {
    const { image, testText } = renderUsefulLink()
    expect(image).toHaveAttribute('alt', `${testText} image link`)
  })
})
