import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SectionBackdrop } from '../SectionBackdrop'

jest.mock('../../../../../config/api', () => ({
  TMDB_CONFIG: {
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
  },
}))

describe('SectionBackdrop', () => {
  const defaultProps = {
    backdropPath: '/test-backdrop.jpg',
    title: 'Test Movie',
  }

  const renderBackdrop = (props = defaultProps) => {
    return render(<SectionBackdrop {...props} />)
  }

  describe('when backdropPath is provided', () => {
    it('renders the backdrop image with correct attributes', () => {
      renderBackdrop()

      const image = screen.getByRole('img')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute(
        'src',
        'https://image.tmdb.org/t/p/original/test-backdrop.jpg'
      )
      expect(image).toHaveAttribute('alt', defaultProps.title)
    })

    it('applies correct styling classes', () => {
      renderBackdrop()

      const header = screen.getByRole('banner')
      expect(header).toHaveClass('w-full', 'h-96', 'relative')

      const image = screen.getByRole('img')
      expect(image).toHaveClass('w-full', 'h-full', 'object-cover')

      const gradient = header.querySelector('div')
      expect(gradient).toHaveClass(
        'absolute',
        'inset-0',
        'bg-gradient-to-t',
        'from-black',
        'to-transparent'
      )
    })
  })

  describe('when backdropPath is not provided', () => {
    it('does not render anything when backdropPath is empty', () => {
      renderBackdrop({ ...defaultProps, backdropPath: '' })
      expect(screen.queryByRole('banner')).not.toBeInTheDocument()
    })

    it('does not render anything when backdropPath is null', () => {
      renderBackdrop({
        ...defaultProps,
        backdropPath: null as unknown as string,
      })
      expect(screen.queryByRole('banner')).not.toBeInTheDocument()
    })
  })
})
