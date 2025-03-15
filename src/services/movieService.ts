import { api } from '../config/api'

export interface Movie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  release_date: string
  overview: string
  vote_average: number
  vote_count: number
  runtime: number
  genres: Array<{
    id: number
    name: string
  }>
  status: string
  tagline: string
}

interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export const getPopularMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const { data } = await api.get('/movie/popular', {
    params: { page },
  })

  return data
}

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse> => {
  const { data } = await api.get('/search/movie', {
    params: {
      query,
      page,
    },
  })

  return data
}

export const getMovieDetails = async (movieId: number): Promise<Movie> => {
  const { data } = await api.get(`/movie/${movieId}`)

  return data
}
