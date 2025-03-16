import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import MovieDetail from '../screens/MovieDetail'
import { getMovieDetails } from '../services/movieService'

jest.mock('../../services/movieService')
const mockGetMovieDetails = getMovieDetails as jest.MockedFunction<
  typeof getMovieDetails
>

jest.mock('../../config/api', () => ({
  TMDB_CONFIG: {
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
    POSTER_SIZE: 'w500',
  },
}))

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  tagline: 'A test tagline',
  overview: 'Test overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-01-01',
  runtime: 120,
  vote_average: 8.5,
  vote_count: 1000,
  status: 'Released',
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Drama' },
  ],
}

const renderWithRouter = (id: string = '1') => {
  return render(
    <MemoryRouter initialEntries={[`/movie/${id}`]}>
      <Routes>
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('MovieDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('displays loading state initially', () => {
    mockGetMovieDetails.mockImplementation(() => new Promise(() => {}))
    renderWithRouter()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays movie details when loaded successfully', async () => {
    mockGetMovieDetails.mockResolvedValue(mockMovie)
    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    })

    expect(screen.getByText(mockMovie.tagline)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument()
    expect(screen.getByText('120 minutes')).toBeInTheDocument()
    expect(screen.getByText('8.5 / 10 (1000 votes)')).toBeInTheDocument()
    expect(screen.getByText('Released')).toBeInTheDocument()

    mockMovie.genres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument()
    })
  })

  it('displays error message when API call fails', async () => {
    mockGetMovieDetails.mockRejectedValue(new Error('API Error'))
    renderWithRouter()

    await waitFor(() => {
      expect(
        screen.getByText(
          'Failed to fetch movie details. Please try again later.'
        )
      ).toBeInTheDocument()
    })
  })
})
