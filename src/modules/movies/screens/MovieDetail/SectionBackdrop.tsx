import React from 'react'
import { TMDB_CONFIG } from '../../../../config/api'

interface SectionBackdropProps {
  backdropPath: string
  title: string
}

export const SectionBackdrop: React.FC<SectionBackdropProps> = ({
  backdropPath,
  title,
}) =>
  backdropPath && (
    <header className="w-full h-96 relative">
      <img
        src={`${TMDB_CONFIG.IMAGE_BASE_URL}original${backdropPath}`}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
    </header>
  )
