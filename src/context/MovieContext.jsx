import { createContext, useMemo, useState } from 'react'

export const MovieContext = createContext(null)

// Stores and shares movie results, the selected movie, loading status, and errors across the app.
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
