import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SectionCast from '../SectionCast'
import { Movie } from '../../../types'

jest.mock('../../../../../config/api', () => ({
  TMDB_CONFIG: {
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
  },
}))

describe('SectionCast', () => {
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
      {
        id: 202,
        name: 'Actor Two',
        profile_path: null,
        character: 'Character Two',
      },
    ],
  }

  const renderSectionCast = (movie = mockMovie, credits = mockCredits) => {
    return render(<SectionCast movie={movie} credits={credits} />)
  }

  describe('Genres Section', () => {
    it('renders all genres', () => {
      renderSectionCast()

      mockMovie.genres.forEach((genre) => {
        const genreElement = screen.getByText(genre.name)
        expect(genreElement).toBeInTheDocument()
        expect(genreElement).toHaveClass(
          'px-3',
          'py-1',
          'bg-gray-200',
          'rounded-full',
          'text-sm'
        )
      })
    })
  })

  describe('Director Section', () => {
    it('renders director when available', () => {
      renderSectionCast()

      expect(screen.getByText('Director')).toBeInTheDocument()
      expect(screen.getByText(mockCredits.director.name)).toBeInTheDocument()
    })
  })

  describe('Cast Section', () => {
    it('renders main cast section when cast exists', () => {
      renderSectionCast()

      expect(screen.getByText('Main Cast')).toBeInTheDocument()
      mockCredits.cast.forEach((actor) => {
        expect(screen.getByText(actor.name)).toBeInTheDocument()
        expect(screen.getByText(actor.character)).toBeInTheDocument()
      })
    })

    it('renders actor profile image when available', () => {
      renderSectionCast()

      const actorWithImage = mockCredits.cast[0]
      const image = screen.getByAltText(actorWithImage.name)
      expect(image).toHaveAttribute(
        'src',
        `https://image.tmdb.org/t/p/w92${actorWithImage.profile_path}`
      )
      expect(image).toHaveClass('w-12', 'h-12', 'rounded-full', 'object-cover')
    })

    it('does not render cast section when cast is empty', () => {
      renderSectionCast(mockMovie, { ...mockCredits, cast: [] })

      expect(screen.queryByText('Main Cast')).not.toBeInTheDocument()
    })
  })
})
