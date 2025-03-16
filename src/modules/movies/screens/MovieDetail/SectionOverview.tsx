import { Movie } from "../../types"

type Props = {
    movie: Movie
}

const SectionOverview = ({ movie }: Props) => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
      {movie.tagline && (
        <p className="text-xl text-gray-600 italic mb-4">{movie.tagline}</p>
      )}
      <div className="mb-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          {movie.overview}
        </p>
      </div>
    </>
  )
}

export default SectionOverview
