import { api } from '../../../config/api'
import { Movie, MovieCredits, MovieResponse } from '../types'

export const getMovieList = async (
  page: number = 1,
  category: string = 'popular'
): Promise<MovieResponse> => {
  const { data } = await api.get(`/movie/${category}`, {
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

export const getMovieCredits = async (
  movieId: number
): Promise<MovieCredits> => {
  const { data } = await api.get(`/movie/${movieId}/credits`)

  return data
}
