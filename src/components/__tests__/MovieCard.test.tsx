import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import MovieCard from '../MovieCard'

jest.mock('../../config/api', () => ({
  TMDB_CONFIG: {
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
    POSTER_SIZE: 'w500',
  },
}))

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  posterPath: '/test-poster.jpg',
  releaseYear: '2024',
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    renderWithRouter(
      <MovieCard
        id={mockMovie.id}
        title={mockMovie.title}
        posterPath={mockMovie.posterPath}
        releaseYear={mockMovie.releaseYear}
      />
    )

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.releaseYear)).toBeInTheDocument()
    expect(screen.getByAltText(`${mockMovie.title} poster`)).toBeInTheDocument()

    const img = screen.getByAltText(`${mockMovie.title} poster`)
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/test-poster.jpg'
    )
  })

  it('uses placeholder image when posterPath is empty', () => {
    renderWithRouter(
      <MovieCard
        id={mockMovie.id}
        title={mockMovie.title}
        posterPath=""
        releaseYear={mockMovie.releaseYear}
      />
    )

    const img = screen.getByAltText(`${mockMovie.title} poster`)
    expect(img).toHaveAttribute('src', '/images/placeholder-poster.jpg')
  })

  it('links to the correct movie detail page', () => {
    renderWithRouter(
      <MovieCard
        id={mockMovie.id}
        title={mockMovie.title}
        posterPath={mockMovie.posterPath}
        releaseYear={mockMovie.releaseYear}
      />
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/movie/${mockMovie.id}`)
  })
})
