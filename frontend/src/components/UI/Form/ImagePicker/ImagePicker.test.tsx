import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, expect, describe, vi } from 'vitest'
import ImagePicker from './ImagePicker'
import '@testing-library/jest-dom/extend-expect'

describe('ImagePicker', () => {
  const renderImagePicker = (imageSet?: boolean) => {
    const mock = vi.fn()
    const image = 'test-image.jpg'
    const id = 'test'
    const label = 'Test Image'
    render(<ImagePicker image={image} id={id} label={label} onInput={mock} />)
    return { mock, image, label }
  }

  it('renders image preview', () => {
    renderImagePicker()
    const imgElement = screen.getByAltText('Image Preview')
    expect(imgElement).toBeInTheDocument()
  })

  it('renders label if no image is provided', () => {
    renderImagePicker()
    const labelElement = screen.getByText('Pick the image')
    expect(labelElement).toBeInTheDocument()
  })

  it('calls onInput when an image is picked', async () => {
    const { mock, image } = renderImagePicker()
    const file = new File(['(⌐□_□)'], image, { type: 'image/jpeg' })
    const inputElement = screen.getByTestId('image-picker')
    await userEvent.upload(inputElement, file)
    expect(mock).toHaveBeenCalledWith('test', file)
  })
})
