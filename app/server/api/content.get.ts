export default defineEventHandler(async (event) => {
    // Return the content data for the landing page
    return {
        hero: {
            title: 'Nuxt4-Design-System',
            tagline: 'Build beautiful, accessible, and consistent UIs with DaisyUI and Tailwind CSS',
            actions: [
                { theme: 'brand', text: 'Get Started', link: '/docs/installation' },
                { theme: 'alt', text: 'View Components', link: '/docs/components' }
            ]
        },
        features: [
            {
                icon: '🎨',
                title: 'DaisyUI Integration',
                details: 'Full DaisyUI 5.0.54 support with all components, variants, and themes'
            },
            {
                icon: '⚡',
                title: 'Nuxt 4 Optimized',
                details: 'Built specifically for Nuxt 4 with auto-imports, SSR support, and performance optimizations'
            },
            {
                icon: '🎯',
                title: 'TypeScript First',
                details: 'Complete TypeScript support with strict typing and runtime validation'
            },
            {
                icon: '♿',
                title: 'Accessibility Ready',
                details: 'WCAG 2.1 AA compliant components with proper ARIA attributes'
            },
            {
                icon: '🎪',
                title: 'Theme System',
                details: 'Dynamic theme switching with 30+ built-in DaisyUI themes'
            },
            {
                icon: '📦',
                title: 'Tree Shakeable',
                details: 'Optimized bundle size with tree shaking and code splitting'
            }
        ]
    }
})
