import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid'
import MovieDetails from './MovieDetails'
import { searchMovies } from '../services/tmdb'
import { MovieProvider } from '../context/MovieContext'
import { useMovieContext } from '../context/useMovieContext'

// 
function HomeContent() {
  const { movies, setMovies, selectedMovie, setSelectedMovie, loading, setLoading, error, setError } = useMovieContext()
  const [searchQuery, setSearchQuery] = useState('')

  //
  useEffect(() => {
    const loadDefaultMovies = async () => {
      setLoading(true)
      try {
        const result = await searchMovies('spider')
        setMovies(result.results || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDefaultMovies()
  }, [setLoading, setMovies, setError])

 // Searches movies via the API, updating loading/error/movies state
 //throughout the request lifecycle (start, success, failure, and cleanup)
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_35%),linear-gradient(135deg,_#050505,_#111111)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleSearch} />
        {error && <p role="alert" className="mb-4 text-red-400">{error}</p>}
        {loading && <p className="mb-4 text-zinc-400">Searching for movies...</p>}
        {!loading && searchQuery && movies.length === 0 && <p className="mb-4 text-zinc-400">No movies found for "{searchQuery}".</p>}
        {!loading && !searchQuery && movies.length > 0 && <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">Trending now</p>}

        {!selectedMovie ? (
          movies.length > 0 && <MovieGrid movies={movies} onOpenMovie={setSelectedMovie} />
        ) : (
          <>
            <button onClick={() => setSelectedMovie(null)} className="mb-4 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-amber-400 hover:text-white">
              Back to results
            </button>
            <MovieDetails movie={selectedMovie} />
          </>
        )}
      </div>
    </div>
  )
}
// Appends to APP Component
export default function Home() {
  return (
    <MovieProvider>
      <HomeContent />
    </MovieProvider>
  )
}
