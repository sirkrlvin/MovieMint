export default function MovieDetails({ movie }) {
  if (!movie) {
    return <p>Select a movie to view details.</p>
  }

  return (
    <section>
      <h2>{movie.title}</h2>
      <p>{movie.overview || 'No description available.'}</p>
      <p><strong>Release:</strong> {movie.releaseDate || 'N/A'}</p>
      <p><strong>Rating:</strong> {movie.rating ?? 'N/A'}</p>
    </section>
  )
}
