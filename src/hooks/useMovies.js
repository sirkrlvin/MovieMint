import { useEffect, useState } from 'react'
import { searchMovies } from '../services/tmdb'

export function useMovies(query = '') {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!query) {
      setMovies([])
      return
    }

    let ignored = false

    async function loadMovies() {
      setLoading(true)
      setError('')
      try {
        const result = await searchMovies(query)
        if (!ignored) setMovies(result.results || [])
      } catch (err) {
        if (!ignored) {
          setError(err.message)
          setMovies([])
        }
      } finally {
        if (!ignored) setLoading(false)
      }
    }

    loadMovies()
    return () => {
      ignored = true
    }
  }, [query])

  return { movies, loading, error }
}
