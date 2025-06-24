import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
    allowedHosts: ['ce74-42-118-241-84.ngrok-free.app']
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
  }
}); 