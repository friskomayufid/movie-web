export interface Movie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  release_date: string
  overview: string
  vote_average: number
  vote_count: number
  runtime: number
  genres: Array<{
    id: number
    name: string
  }>
  status: string
  tagline: string
}

export interface Credit {
  id: number
  name: string
  character?: string
  job?: string
  profile_path: string | null
}

export interface MovieCredits {
  cast: Credit[]
  crew: Credit[]
}

export interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}