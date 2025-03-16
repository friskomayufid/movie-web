import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMovieDetails } from '../../hooks/useMovieDetail'
import SectionOverview from './SectionOverview'
import SectionInfo from './SectionInfo'
import SectionCast from './SectionCast'
import Button from '../../../../components/shared/Button'
import { SectionBackdrop } from './SectionBackdrop'
import { SectionPoster } from './SectionPoster'

const MovieDetail: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { movie, credits, loading, error } = useMovieDetails(id)

  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </main>
    )
  }

  if (error || !movie) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-red-600 text-center">{error || 'Movie not found'}</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Button onClick={() => navigate(-1)} className="mb-5">
        Back
      </Button>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <SectionBackdrop
          backdropPath={movie.backdrop_path}
          title={movie.title}
        />

        <section className="flex flex-col md:flex-row gap-8 p-8">
          <SectionPoster posterPath={movie.poster_path} title={movie.title} />

          <div className="w-full md:w-2/3">
            <SectionOverview movie={movie} />
            <SectionInfo movie={movie} />
            <SectionCast movie={movie} credits={credits} />
          </div>
        </section>
      </article>
    </main>
  )
}

export default MovieDetail
