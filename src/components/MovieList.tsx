import React, { useState } from 'react'
import MovieCard from './MovieCard'
import Button from './shared/Button'
import { useFetchMovies } from '../hooks/useFetchMovies'

const MovieList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('now_playing')

  const {
    movies,
    loading,
    error,
    loadMoreMovies,
    resetMovies,
    hasMore,
  } = useFetchMovies(selectedCategory)

  const categories = [
    { id: 'now_playing', name: 'Now Playing' },
    { id: 'popular', name: 'Popular' },
    { id: 'top_rated', name: 'Top Rated' },
    { id: 'upcoming', name: 'Upcoming' },
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = (category: string) => {
    resetMovies()
    setSelectedCategory(category)
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseYear={movie.release_date.split('-')[0]}
          />
        ))}
      </div>
      {loading && (
        <div className="text-center p-4">
          <p>Loading...</p>
        </div>
      )}
      {!loading && hasMore && (
        <div className="text-center mt-8">
          <Button onClick={loadMoreMovies}>Load More</Button>
        </div>
      )}
    </div>
  )
}

export default MovieList
