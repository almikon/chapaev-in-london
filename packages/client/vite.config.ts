import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import * as path from 'path'
import { defineConfig } from 'vite'

dotenv.config({
  path: '../../.env'
})

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000
  },
  define: {
    'process.env': process.env,
    __SERVER_PORT__: process.env.SERVER_PORT
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
})
