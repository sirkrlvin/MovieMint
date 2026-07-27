import MovieCard from './MovieCard'

export default function MovieGrid({ movies, onOpenMovie }) {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onOpen={onOpenMovie} />
      ))}
    </div>
  )
}
