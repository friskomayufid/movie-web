import { useState, useEffect } from 'react'
import { getMovieCredits, getMovieDetails } from '../services/movieService'
import { Credit, Movie } from '../types'

interface MovieDetailsState {
  movie: Movie | null
  credits: {
    cast: Credit[]
    director: Credit | null
  }
  loading: boolean
  error: string | null
}

export const useMovieDetails = (id: string | undefined) => {
  const [state, setState] = useState<MovieDetailsState>({
    movie: null,
    credits: {
      cast: [],
      director: null,
    },
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!id) return

    const fetchMovieData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(Number(id)),
          getMovieCredits(Number(id)),
        ])

        const director = creditsData.crew.find(
          (person) => person.job === 'Director'
        )
        const mainCast = creditsData.cast.slice(0, 5)

        setState({
          movie: movieData,
          credits: {
            cast: mainCast,
            director: director || null,
          },
          loading: false,
          error: null,
        })
      } catch (err) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch movie details. Please try again later.',
        }))
        throw err
      }
    }

    fetchMovieData()
  }, [id])

  return state
}
