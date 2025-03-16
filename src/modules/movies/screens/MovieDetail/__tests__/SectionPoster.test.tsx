import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SectionPoster } from '../SectionPoster'

jest.mock('../../../../../config/api', () => ({
  TMDB_CONFIG: {
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
    POSTER_SIZE: 'w500',
  },
}))

describe('SectionPoster', () => {
  const defaultProps = {
    posterPath: '/test-poster.jpg',
    title: 'Test Movie',
  }

  const renderSectionPoster = (props = defaultProps) => {
    return render(<SectionPoster {...props} />)
  }

  it('renders the movie poster with correct attributes', () => {
    renderSectionPoster()

    const poster = screen.getByRole('img')

    expect(poster).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/test-poster.jpg'
    )

    expect(poster).toHaveAttribute('alt', defaultProps.title)
  })

  it('has correct styling classes', () => {
    renderSectionPoster()

    const container = screen.getByRole('complementary')
    expect(container).toHaveClass('w-full', 'md:w-1/3')

    const poster = screen.getByRole('img')
    expect(poster).toHaveClass('w-full', 'rounded-lg', 'shadow-lg')
  })
})
