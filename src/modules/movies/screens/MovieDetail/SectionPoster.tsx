import { TMDB_CONFIG } from '../../../../config/api'

interface SectionPosterProps {
  posterPath: string
  title: string
}

export const SectionPoster = ({ posterPath, title }: SectionPosterProps) => (
  <aside className="w-full md:w-1/3">
    <img
      src={`${TMDB_CONFIG.IMAGE_BASE_URL}${TMDB_CONFIG.POSTER_SIZE}${posterPath}`}
      alt={title}
      className="w-full rounded-lg shadow-lg"
    />
  </aside>
)
