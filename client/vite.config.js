import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://post-app-react-z5ki-mgdy21utf-fir0ws-projects.vercel.app',
      }
    }
  }
});
