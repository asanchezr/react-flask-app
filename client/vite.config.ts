/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.js'],
    clearMocks: true,
    env: {
      DEBUG_PRINT_LIMIT: '999999',
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        rewrite: (path: string) => path,
        xfwd: true,
        cookiePathRewrite: '/',
        cookieDomainRewrite: '',
      },
    },
  },
});
