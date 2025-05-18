import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['zod', '@hookform/resolvers/zod'],
    exclude: ['lucide-react'],
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
