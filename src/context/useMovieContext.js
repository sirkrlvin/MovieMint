import { useContext } from 'react'
import { MovieContext } from './MovieContext'

// Gives components access to the shared movie state.
export function useMovieContext() {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovieContext must be used inside MovieProvider')
  }
  return context
}
