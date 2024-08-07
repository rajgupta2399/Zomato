import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import Mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true }, 
  plugins: [react(),Mkcert()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
