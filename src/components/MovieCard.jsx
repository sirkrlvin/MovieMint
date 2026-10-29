export default function MovieCard({ movie, onOpen }) {
  const releaseYear = movie.releaseDate ? movie.releaseDate.slice(0, 4) : 'N/A'
  const rating = movie.rating ? movie.rating.toFixed(1) : 'N/A'
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : 'https://via.placeholder.com/300x450?text=No+Poster'

  return (
    <article className="group cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/30 transition duration-200 hover:-translate-y-1 hover:border-amber-400/60" onClick={() => onOpen?.(movie)}>
      <div className="relative">
        <img src={posterUrl} alt={movie.title} className="h-72 w-full object-cover transition duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            <span>New</span>
            <span>•</span>
            <span>{releaseYear}</span>
          </div>
          <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
          <p className="mt-1 text-sm text-zinc-300">⭐ {rating}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-4 line-clamp-3 text-sm leading-6 text-zinc-400">{movie.overview || 'No description available.'}</p>
        <button className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-amber-400" onClick={(event) => { event.stopPropagation(); onOpen?.(movie) }}>
          Watch now
        </button>
      </div>
    </article>
  )
}
