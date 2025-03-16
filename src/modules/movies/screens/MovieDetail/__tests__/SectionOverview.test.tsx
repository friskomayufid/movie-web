import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SectionOverview from '../SectionOverview'
import { Movie } from '../../../types'

describe('SectionOverview', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    tagline: 'Test Tagline',
    overview: 'Test movie overview text',
    poster_path: '/test.jpg',
    backdrop_path: '/backdrop.jpg',
    release_date: '2024-03-16',
    runtime: 120,
    vote_average: 8.5,
    vote_count: 1000,
    genres: [{ id: 1, name: 'Action' }],
    status: 'Released',
  }

  const renderSectionOverview = (movie: Movie = mockMovie) => {
    return render(<SectionOverview movie={movie} />)
  }

  it('renders movie title', () => {
    renderSectionOverview()
    const title = screen.getByRole('heading', { level: 1 })

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(mockMovie.title)
    expect(title).toHaveClass('text-4xl', 'font-bold', 'mb-2')
  })

  it('renders tagline when provided', () => {
    renderSectionOverview()
    const tagline = screen.getByText(mockMovie.tagline)

    expect(tagline).toBeInTheDocument()
    expect(tagline).toHaveClass('text-xl', 'text-gray-600', 'italic', 'mb-4')
  })

  it('does not render tagline when not provided', () => {
    const movieWithoutTagline = { ...mockMovie, tagline: '' }
    renderSectionOverview(movieWithoutTagline)

    expect(screen.queryByText(mockMovie.tagline)).not.toBeInTheDocument()
  })

  it('renders movie overview', () => {
    renderSectionOverview()
    const overview = screen.getByText(mockMovie.overview)

    expect(overview).toBeInTheDocument()
  })
})
