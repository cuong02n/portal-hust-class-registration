import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [react()],
  optimizeDeps:{
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip'
    ],
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      }
    }
  },
  server:{
    port:5174
  }
})
