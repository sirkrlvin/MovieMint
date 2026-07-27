import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid'
import MovieDetails from './MovieDetails'
import { searchMovies } from '../services/tmdb'
import { MovieProvider, useMovieContext } from '../context/MovieContext'

function HomeContent() {
  const { movies, setMovies, selectedMovie, setSelectedMovie, loading, setLoading, error, setError } = useMovieContext()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadDefaultMovies = async () => {
      setLoading(true)
      try {
        const result = await searchMovies('popular')
        setMovies(result.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDefaultMovies()
  }, [setLoading, setMovies, setError])

  const handleSearch = async (query) => {
    setSearchQuery(query)
    setLoading(true)
    setError('')

    try {
      const result = await searchMovies(query)
      setMovies(result.results || [])
    } catch (err) {
      setError(err.message)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <SearchBar onSearch={handleSearch} />

      {error && <p role="alert">{error}</p>}
      {loading && <p>Searching for movies...</p>}
      {!loading && searchQuery && movies.length === 0 && <p>No movies found for "{searchQuery}".</p>}

      {!selectedMovie ? (
        movies.length > 0 && <MovieGrid movies={movies} onOpenMovie={setSelectedMovie} />
      ) : (
        <>
          <button onClick={() => setSelectedMovie(null)} style={{ marginBottom: '1rem' }}>Back to results</button>
          <MovieDetails movie={selectedMovie} />
        </>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <MovieProvider>
      <HomeContent />
    </MovieProvider>
  )
}
