import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import MovieCard from '../MovieCard'
import { TMDB_CONFIG } from '../../../../config/api'

jest.mock('../../../../config/api', () => ({
  TMDB_CONFIG: {
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
    POSTER_SIZE: 'w500',
  },
}))

describe('MovieCard', () => {
  const defaultProps = {
    id: 1,
    title: 'Test Movie',
    posterPath: '/test-poster.jpg',
    releaseYear: '2024',
  }

  const renderMovieCard = (props = defaultProps) => {
    return render(
      <BrowserRouter>
        <MovieCard {...props} />
      </BrowserRouter>
    )
  }

  describe('rendering', () => {
    it('should render movie information correctly', () => {
      renderMovieCard()

      expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
      expect(screen.getByText(defaultProps.releaseYear)).toBeInTheDocument()

      const image = screen.getByAltText(`${defaultProps.title} poster`)
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute(
        'src',
        `${TMDB_CONFIG.IMAGE_BASE_URL}${TMDB_CONFIG.POSTER_SIZE}${defaultProps.posterPath}`
      )
    })

    it('should use placeholder image when posterPath is empty', () => {
      renderMovieCard({ ...defaultProps, posterPath: '' })

      const image = screen.getByAltText(`${defaultProps.title} poster`)
      expect(image).toHaveAttribute('src', '/images/placeholder-poster.jpg')
    })
  })

  describe('navigation', () => {
    it('should have correct link to movie details', () => {
      renderMovieCard()

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', `/movie/${defaultProps.id}`)
    })
  })
})
