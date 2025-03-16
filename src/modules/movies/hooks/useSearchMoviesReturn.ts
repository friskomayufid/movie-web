import { useState, useEffect, useCallback } from 'react'
import { searchMovies } from '../services/movieService'
import useDebounce from '../../../hooks/useDebounce'
import { Movie } from '../types'

interface UseSearchMoviesReturn {
  searchResults: Movie[]
  searchLoading: boolean
  searchError: string | null
  hasMoreResults: boolean
  loadMoreResults: () => Promise<void>
  resetSearch: () => void
}

export const useSearchMovies = (query: string): UseSearchMoviesReturn => {
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [searchPage, setSearchPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const debouncedQuery = useDebounce(query, 500)

  const fetchSearchResults = useCallback(async () => {
    if (!debouncedQuery.trim()) {
      setSearchResults([])
      return
    }

    try {
      setSearchLoading(true)
      setSearchError(null)
      const data = await searchMovies(debouncedQuery, searchPage)
      setSearchResults((prevResults) =>
        searchPage === 1 ? data.results : [...prevResults, ...data.results]
      )
      setTotalPages(data.total_pages)
    } catch (err) {
      setSearchError('Failed to search movies. Please try again.')
      throw err
    } finally {
      setSearchLoading(false)
    }
  }, [debouncedQuery, searchPage])

  useEffect(() => {
    setSearchResults([])
    setSearchPage(1)
    setTotalPages(0)
  }, [debouncedQuery])

  useEffect(() => {
    fetchSearchResults()
  }, [fetchSearchResults])

  const loadMoreResults = async () => {
    if (!searchLoading && searchPage < totalPages) {
      setSearchPage((prev) => prev + 1)
    }
  }

  const resetSearch = useCallback(() => {
    setSearchResults([])
    setSearchPage(1)
    setSearchError(null)
    setTotalPages(0)
  }, [])

  return {
    searchResults,
    searchLoading,
    searchError,
    hasMoreResults: searchPage < totalPages,
    loadMoreResults,
    resetSearch,
  }
}
