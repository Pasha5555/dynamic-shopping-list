import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  define: {
    'process.env': {
      'NEXT_PUBLIC_API_URL': 'http://localhost:3000'
    },
  }
})
