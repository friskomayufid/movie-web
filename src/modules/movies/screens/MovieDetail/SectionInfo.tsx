import MovieInfo from '../../components/MovieInfo'
import { Movie } from '../../types'

type Props = {
  movie: Movie
}

const SectionInfo = ({ movie }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <MovieInfo
        title="Release Date"
        desc={new Date(movie.release_date).toLocaleDateString()}
      />
      <MovieInfo title="Runtime" desc={`${movie.runtime} minutes`} />
      <MovieInfo
        title="Rating"
        desc={`${movie.vote_average.toFixed(1)} / 10 (${
          movie.vote_count
        } votes)`}
      />
      <MovieInfo title="Status" desc={movie.status} />
    </div>
  )
}

export default SectionInfo
