import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/news-aggregator/',
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: "News Aggregator",
                short_name: "Aggregator",
                description: "Интеллектуальный агрегатор новостей для трейдеров на российском фондовом рынке",
                lang: "ru-RU",
                start_url: "/",
                scope: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#0f172a",
                orientation: "portrait",
                categories: ["finance", "news", "investment"],
                dir: "ltr",
                icons: [
                    {
                        src: "icons/icon512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "icons/icon512_rounded.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "icons/icon512_maskable.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable"
                    }
                ],
                screenshots: [
                    {
                        src: "screenshots/desktop.png",
                        sizes: "1918x872",
                        type: "image/png",
                        label: "Десктопная версия",
                        form_factor: "wide"
                    },
                    {
                        src: "screenshots/mobile.png",
                        sizes: "403x686",
                        type: "image/png",
                        label: "Мобильная версия",
                        form_factor: "narrow"
                    }
                ]
            },
            workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json,mp3}'],
                globIgnores: [
                    '**/node_modules/**/*',
                    '**/dev-dist/**/*',
                    'sw.js',
                    'workbox-*.js'
                ]
            }
        }),
    ],
    build: {
        target: 'esnext',
        minify: 'esbuild',
        sourcemap: false,
    },
    optimizeDeps: {
        include: ['react', 'react-dom'],
    },
})
