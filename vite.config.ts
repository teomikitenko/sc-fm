import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import dynamicImport from 'vite-plugin-dynamic-import'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dynamicImport(),
        VitePWA({
            manifest: {
                name: 'ScFM',
                short_name: 'ScFM',
                description: 'ScFM - it is app for listening music',
                theme_color: '#1f2937',
                background_color: '#1f2937',
                display: 'standalone',
                related_applications: [{
                    "platform": "play",
                    "url": "https://app.example.com/manifest.json"
                  }],
                icons: [
                    {
                        src: 'pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            injectRegister: 'auto',
        }),
    ],
})
