import { TMDB_CONFIG } from '../../../../config/api'
import { Credit, Movie } from '../../types'

type Props = {
  movie: Movie
  credits: {
    cast: Credit[]
    director: Credit | null
  }
}

const SectionCast = ({ movie, credits }: Props) => {
  return (
    <>
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
      <div className="mb-6 mt-5">
        {credits.director && (
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold">Director</h3>
            <p>{credits.director.name}</p>
          </div>
        )}

        {credits.cast.length > 0 && (
          <div>
            <h3 className="text-gray-600 font-semibold mb-2">Main Cast</h3>
            <div className="grid grid-cols-2 gap-4">
              {credits.cast.map((actor) => (
                <div key={actor.id} className="flex items-center gap-3">
                  {actor.profile_path && (
                    <img
                      src={`${TMDB_CONFIG.IMAGE_BASE_URL}w92${actor.profile_path}`}
                      alt={actor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{actor.name}</p>
                    <p className="text-sm text-gray-600">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SectionCast
