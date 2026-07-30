import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/tmdb': {
        target: 'https://api.themoviedb.org/3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tmdb/, ''),
        headers: {
          'User-Agent': 'MovieMint-Client/1.0',
        },
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const apiKey = process.env.VITE_TMDB_API_KEY
            if (apiKey) {
              const separator = proxyReq.path.includes('?') ? '&' : '?'
              proxyReq.path += `${separator}api_key=${apiKey}`
            }
          })
        },
      },
    },
  },
})
