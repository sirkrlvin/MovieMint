export function normalizeMovie(raw) {
  if (!raw) return null

  return {
    id: raw.id,
    title: raw.title || raw.name || '',
    overview: raw.overview || '',
    releaseDate: raw.release_date || raw.first_air_date || null,
    posterPath: raw.poster_path || null,
    backdropPath: raw.backdrop_path || null,
    genres: Array.isArray(raw.genre_ids)
      ? raw.genre_ids
      : Array.isArray(raw.genres)
        ? raw.genres.map((item) => item.id)
        : [],
    adult: !!raw.adult || !!raw.softcore,
    popularity: raw.popularity ?? 0,
    rating: raw.vote_average ?? null,
    voteCount: raw.vote_count ?? 0,
    originalLanguage: raw.original_language || null,
  }
}
