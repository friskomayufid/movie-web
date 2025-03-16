import React from 'react'
import { Link } from 'react-router-dom'
import { TMDB_CONFIG } from '../../../config/api'

interface MovieCardProps {
  id: number
  title: string
  posterPath: string
  releaseYear: string
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  releaseYear,
}) => {
  const imageUrl = posterPath
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}${TMDB_CONFIG.POSTER_SIZE}${posterPath}`
    : '/images/placeholder-poster.jpg'

  return (
    <Link to={`/movie/${id}`} className="block group">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 group-hover:scale-105">
        <div className="aspect-[2/3] relative">
          <img
            src={imageUrl}
            alt={`${title} poster`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600">
            {title}
          </h3>
          <p className="text-gray-600">{releaseYear}</p>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
