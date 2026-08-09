import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const apiKey = env.VITE_TMDB_API_KEY

  return defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/tmdb': {
          target: 'https://api.themoviedb.org/3',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tmdb/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
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
}
