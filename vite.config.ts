import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from "node:path";
import process from "node:process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': path.resolve(process.cwd(), 'src'),
      '@/app': path.resolve(process.cwd(), 'src/app'),
      '@/components': path.resolve(process.cwd(), 'src/components'),
      '@/ducks': path.resolve(process.cwd(), 'src/ducks'),
      '@/slices': path.resolve(process.cwd(), 'src/slices'),
      '@/types': path.resolve(process.cwd(), 'src/types'),
      '@/src': path.resolve(process.cwd(), 'src'),
    }
  },
  base: "/apps/current-openings/",
  build: {
    manifest: true,
    sourcemap: true,
    // if additional package splitting is needed,
    // make sure https://chums.com/pages/careers points
    // to the additional resources for rendering.
    // see the Shopify theme file: sections/open-positions-live.liquid
  },
  server: {
    port: 8080,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    }
  }
})
