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
                        'Modern Design System for Nuxt 4+ with TailwindCSS, DaisyUI and comprehensive component library',
                },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },

    // Experimental features
    experimental: {
        inlineRouteRules: true,
    },

    // Nitro configuration
    nitro: {
        prerender: {
            routes: ['/'],
        },
    },
    nuxtDesignSystem: {},
})
