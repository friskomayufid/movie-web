import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetails, Movie } from '../services/movieService'
import { TMDB_CONFIG } from '../config/api'

const MovieDetail: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const data = await getMovieDetails(Number(id))
        setMovie(data)
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchMovieDetails()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600 text-center">{error || 'Movie not found'}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md mb-5 cursor-pointer"
        onClick={handleBack}
      >
        Back
      </button>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {movie.backdrop_path && (
          <div className="w-full h-96 relative">
            <img
              src={`${TMDB_CONFIG.IMAGE_BASE_URL}original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          </div>
        )}
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img
                src={`${TMDB_CONFIG.IMAGE_BASE_URL}${TMDB_CONFIG.POSTER_SIZE}${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-gray-600 italic mb-4">
                  {movie.tagline}
                </p>
              )}
              <div className="mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {movie.overview}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-gray-600 font-semibold">Release Date</h3>
                  <p>{new Date(movie.release_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-gray-600 font-semibold">Runtime</h3>
                  <p>{movie.runtime} minutes</p>
                </div>
                <div>
                  <h3 className="text-gray-600 font-semibold">Rating</h3>
                  <p>
                    {movie.vote_average.toFixed(1)} / 10 ({movie.vote_count}{' '}
                    votes)
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-600 font-semibold">Status</h3>
                  <p>{movie.status}</p>
                </div>
              </div>
              <div>
                <h3 className="text-gray-600 font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
