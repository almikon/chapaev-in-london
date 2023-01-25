import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'chapaevinlondon',
      formats: ['cjs']
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist'
      }
    },
    ssr: true
  },
  ssr: {
    format: 'cjs'
  }
})
