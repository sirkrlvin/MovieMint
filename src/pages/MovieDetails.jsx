// OnClick links user to description about the movie
export default function MovieDetails({ movie }) {
  if (!movie) {
    return <p>Select a movie to view details.</p>
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/30">
      <h2 className="mb-3 text-3xl font-semibold text-white">{movie.title}</h2>
      <p className="mb-4 leading-7 text-zinc-300">{movie.overview || 'No description available.'}</p>
      <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
        <p><strong className="text-white">Release:</strong> {movie.releaseDate || 'N/A'}</p>
        <p><strong className="text-white">Rating:</strong> {movie.rating ?? 'N/A'}</p>
      </div>
    </section>
  )
}
