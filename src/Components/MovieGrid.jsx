import MovieCard from './MovieCard'

export default function MovieGrid({ movies, onOpenMovie }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onOpen={onOpenMovie} />
      ))}
    </div>
  )
}
