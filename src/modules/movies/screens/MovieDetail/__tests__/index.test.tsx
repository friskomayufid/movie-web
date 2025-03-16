import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import MovieDetail from '../index'
import { useMovieDetails } from '../../../hooks/useMovieDetail'

jest.mock('../../../hooks/useMovieDetail')

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test Overview',
  tagline: 'Test Tagline',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-03-16',
  runtime: 120,
  vote_average: 8.5,
  vote_count: 1000,
  status: 'Released',
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Drama' },
  ],
}

const mockCredits = {
  director: {
    id: 100,
    name: 'John Director',
    profile_path: '/director.jpg',
    job: 'Director',
  },
  cast: [
    {
      id: 201,
      name: 'Actor One',
      profile_path: '/actor1.jpg',
      character: 'Character One',
    },
  ],
}

describe('MovieDetail', () => {
  const renderMovieDetail = () => {
    return render(
      <BrowserRouter>
        <MovieDetail />
      </BrowserRouter>
    )
  }

  describe('Loading State', () => {
    it('displays loading indicator when fetching data', () => {
      ;(useMovieDetails as jest.Mock).mockReturnValue({
        loading: true,
        error: null,
        movie: null,
        credits: null,
      })

      renderMovieDetail()
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('displays error message when fetch fails', () => {
      const errorMessage = 'Failed to fetch movie details'
      ;(useMovieDetails as jest.Mock).mockReturnValue({
        loading: false,
        error: errorMessage,
        movie: null,
        credits: null,
      })

      renderMovieDetail()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })

    it('displays "Movie not found" when movie is null but no error', () => {
      ;(useMovieDetails as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        movie: null,
        credits: null,
      })

      renderMovieDetail()
      expect(screen.getByText('Movie not found')).toBeInTheDocument()
    })
  })

  describe('Success State', () => {
    beforeEach(() => {
      ;(useMovieDetails as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        movie: mockMovie,
        credits: mockCredits,
      })
    })

    it('renders all sections when data is loaded', () => {
      renderMovieDetail()

      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()

      expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
      expect(screen.getByText(mockMovie.overview)).toBeInTheDocument()

      expect(screen.getByText('Release Date')).toBeInTheDocument()
      expect(screen.getByText('Runtime')).toBeInTheDocument()
      expect(
        screen.getByText(`${mockMovie.runtime} minutes`)
      ).toBeInTheDocument()

      expect(screen.getByText('Director')).toBeInTheDocument()
      expect(screen.getByText(mockCredits.director.name)).toBeInTheDocument()
      expect(screen.getByText(mockCredits.cast[0].name)).toBeInTheDocument()
    })

    it('renders with correct layout structure', () => {
      renderMovieDetail()

      expect(screen.getByRole('main')).toHaveClass(
        'container',
        'mx-auto',
        'px-4',
        'py-8'
      )
      expect(screen.getByRole('article')).toHaveClass(
        'bg-white',
        'rounded-lg',
        'shadow-lg',
        'overflow-hidden'
      )
    })
  })
})
