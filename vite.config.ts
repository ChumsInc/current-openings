import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
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
