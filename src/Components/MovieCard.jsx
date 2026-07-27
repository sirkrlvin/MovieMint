export default function MovieCard({ movie, onOpen }) {
  const releaseYear = movie.releaseDate ? movie.releaseDate.slice(0, 4) : 'N/A'
  const rating = movie.rating ? movie.rating.toFixed(1) : 'N/A'
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : 'https://via.placeholder.com/300x450?text=No+Poster'

  return (
    <article style={{ border: '1px solid #eee', borderRadius: 10, padding: 12, marginBottom: 12 }} onClick={() => onOpen?.(movie)}>
      <img src={posterUrl} alt={movie.title} style={{ width: '100%', maxWidth: 180, borderRadius: 8, display: 'block', marginBottom: 8 }} />
      <h3>{movie.title}</h3>
      <p>{releaseYear} • ⭐ {rating}</p>
      <p>{movie.overview || 'No description available.'}</p>
      <button onClick={(event) => { event.stopPropagation(); onOpen?.(movie) }}>View details</button>
    </article>
  )
}
