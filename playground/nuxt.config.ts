import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    modules: ['../src/module'],

    // Enable pages for multi-page routing
    pages: true,
    devtools: { enabled: true },

    // App configuration
    app: {
        head: {
            title: 'Nuxt Design System - Documentation',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    name: 'description',
                    content:
                        'Modern Design System for Nuxt 4+ with comprehensive component library - TailwindCSS and DaisyUI configured by client',
                },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },

    // CSS configuration - clients need to configure their own CSS
    css: ['~/assets/css/main.css'],
    devServer: {
        port: 3031,
    },

    // Experimental features
    experimental: {
        inlineRouteRules: true,
    },

    // Nitro configuration
    nitro: {
        prerender: {
            routes: [
                '/',
                '/components',
                '/components/mockup',
                '/components/mockup/browser',
                '/components/mockup/code',
                '/components/mockup/phone',
                '/components/mockup/window',
            ],
        },
    },

    // Configure TailwindCSS v4 - clients need to do this
    vite: {
        // eslint-disable-next-line
        plugins: [tailwindcss() as any],
    },

    // Design system configuration
    nuxtDesignSystem: {
        prefix: 'Bp',
        components: true,
        css: true,
        composables: true,
    },
})
