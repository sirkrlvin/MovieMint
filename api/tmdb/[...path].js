import process from 'node:process'

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'TMDB_API_KEY is not configured' })
  }

  const path = Array.isArray(req.query.path) ? req.query.path : [req.query.path]
  const isMovieSearch = path.length === 2 && path[0] === 'search' && path[1] === 'movie'
  const isMovieDetails = path.length === 2 && path[0] === 'movie' && /^\d+$/.test(path[1])

  if (!isMovieSearch && !isMovieDetails) {
    return res.status(404).json({ error: 'TMDB endpoint not found' })
  }

  const url = new URL(`${TMDB_API_BASE_URL}/${path.map(encodeURIComponent).join('/')}`)
  for (const [key, value] of Object.entries(req.query)) {
    if (key === 'path') continue
    for (const item of Array.isArray(value) ? value : [value]) {
      url.searchParams.append(key, item)
    }
  }
  url.searchParams.set('api_key', apiKey)

  try {
    const response = await fetch(url)
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json')
    return res.status(response.status).send(await response.text())
  } catch (error) {
    console.error('TMDB request failed:', error)
    return res.status(502).json({ error: 'Unable to reach TMDB' })
  }
}
