import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { getPopularMovies, Movie } from "../services/movieService";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(page);
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseYear={movie.release_date.split("-")[0]}
          />
        ))}
      </div>
      {loading && (
        <div className="text-center p-4">
          <p>Loading...</p>
        </div>
      )}
      {!loading && page < totalPages && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
