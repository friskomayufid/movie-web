import { useEffect, useState, useCallback } from 'react'
import { getMovieList } from '../services/movieService'
import { Movie } from '../types'

interface UseFetchMoviesReturn {
  movies: Movie[]
  loading: boolean
  error: string | null
  loadMoreMovies: () => Promise<void>
  resetMovies: () => void
  hasMore: boolean
}

export const useFetchMovies = (
  selectedCategory: string
): UseFetchMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMovieList(page, selectedCategory)
      setMovies((prevMovies) =>
        page === 1 ? data.results : [...prevMovies, ...data.results]
      )
      setTotalPages(data.total_pages)
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.')
      throw err
    } finally {
      setLoading(false)
    }
  }, [page, selectedCategory])

  useEffect(() => {
    setMovies([])
    setPage(1)
  }, [selectedCategory])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies, page, selectedCategory])

  const loadMoreMovies = async () => {
    if (!loading && page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  const resetMovies = () => {
    setMovies([])
    setPage(1)
    setError(null)
  }

  return {
    movies,
    loading,
    error,
    loadMoreMovies,
    resetMovies,
    hasMore: page < totalPages,
  }
}
