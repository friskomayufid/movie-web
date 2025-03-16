import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SectionInfo from '../SectionInfo'
import { Movie } from '../../../types'

describe('SectionInfo', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test Overview',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    release_date: '2024-03-16',
    runtime: 120,
    vote_average: 8.5,
    vote_count: 1000,
    status: 'Released',
    tagline: 'Test Tagline',
    genres: [{ id: 1, name: 'Action' }],
  }

  const renderSectionInfo = (movie: Movie = mockMovie) => {
    return render(<SectionInfo movie={movie} />)
  }

  it('renders all movie information correctly', () => {
    renderSectionInfo()

    expect(screen.getByText('Release Date')).toBeInTheDocument()
    expect(screen.getByText('3/16/2024')).toBeInTheDocument()

    expect(screen.getByText('Runtime')).toBeInTheDocument()
    expect(screen.getByText('120 minutes')).toBeInTheDocument()

    expect(screen.getByText('Rating')).toBeInTheDocument()
    expect(screen.getByText('8.5 / 10 (1000 votes)')).toBeInTheDocument()

    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Released')).toBeInTheDocument()
  })
})
