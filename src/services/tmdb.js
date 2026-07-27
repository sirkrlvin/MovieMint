import { normalizeMovie } from '../utils/normalizeMovie'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_TMDB_API_KEY'
const BASE_URL = 'https://api.themoviedb.org/3'

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`)
  }

  return response.json()
}

export async function searchMovies(query, page = 1) {
  if (!query || !query.trim()) {
    return { results: [], page: 1, total_pages: 0, total_results: 0 }
  }

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  const data = await fetchJson(url)

  return {
    results: (data.results || []).map(normalizeMovie),
    page: data.page || 1,
    total_pages: data.total_pages || 0,
    total_results: data.total_results || 0,
  }
}

export async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  const data = await fetchJson(url)
  return normalizeMovie(data)
}
