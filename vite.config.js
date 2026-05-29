import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/3d/',
  build: {
    minify: false,
    sourcemap: true
  },
  server: {
    port: 8999,
    strictPort: true
  },
  preview: {
    port: 8999,
    strictPort: true
  }
});
