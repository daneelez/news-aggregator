import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
                type: "module"
            },
            manifest: {
                name: "News Aggregator",
                short_name: "News Aggregator",
                description: "Интеллектуальный агрегатор новостей для трейдеров на российском фондовом рынке",
                lang: "ru-RU",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#0f172a",
                orientation: "portrait",
                categories: ["finance", "news", "investment"],
                dir: "ltr",
                icons: [
                    {
                        src: "/icons/icon192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "/icons/icon512_rounded.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "/icons/icon512_maskable.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable"
                    }
                ],
                screenshots: [
                    {
                        src: "/screenshots/desktop.png",
                        type: "image/png",
                        sizes: "1918x862",
                        form_factor: "wide",
                        label: "Дашборд на десктопе"
                    },
                    {
                        src: "/screenshots/mobile.png",
                        type: "image/png",
                        sizes: "398x756",
                        form_factor: "narrow",
                        label: "Мобильная лента новостей"
                    }
                ],
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
    server: {
        host: true,
        port: 5173,
    },
})
