import React from "react"
import { Link } from "react-router-dom"
import { TMDB_CONFIG } from "../config/api"

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
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/${TMDB_CONFIG.POSTER_SIZE}${posterPath}`
    : "/placeholder-poster.jpg"

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/movie/${id}`} className="block">
        <img
          src={imageUrl}
          alt={`${title} poster`}
          className="w-full h-[300px] object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600">{releaseYear}</p>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
