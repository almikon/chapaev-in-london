import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config();

export default defineConfig({
	server: {
		port: Number(process.env.CLIENT_PORT) || 3000,
	},
	define: {
		'process.env': process.env,
		__SERVER_PORT__: process.env.SERVER_PORT,
	},
	plugins: [react()],
});
