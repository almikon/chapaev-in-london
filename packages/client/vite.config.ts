import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import {defineConfig} from 'vite';
import * as path from 'path';

dotenv.config();

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3001,
  },
  define: {
    'process.env': process.env,
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
});
