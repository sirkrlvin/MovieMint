import { createContext, useContext, useMemo, useState } from 'react'

const MovieContext = createContext(null)

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const value = useMemo(() => ({
    movies,
    setMovies,
    selectedMovie,
    setSelectedMovie,
    loading,
    setLoading,
    error,
    setError,
  }), [movies, selectedMovie, loading, error])

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}

export function useMovieContext() {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovieContext must be used inside MovieProvider')
  }
  return context
}
