import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    const isProduction = process.env.APP_ENV === 'production';

    return {
        plugins: [
            laravel({
                input: 'resources/js/app.tsx',
                refresh: true,
            }),
            react(),
        ],
        base: '/',
        server: {
            https: isProduction, // Solo en producción se usa HTTPS
        },
    };
});