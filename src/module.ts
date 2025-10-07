import {
    defineNuxtModule,
    addPlugin,
    createResolver,
    addComponentsDir,
    addImportsDir,
    addVitePlugin,
} from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'

// Module options TypeScript interface definition
export interface ModuleOptions {
    prefix: string
    components: boolean
    css: boolean
    composables: boolean
    tailwind: boolean
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: '@boilerplatepowa/nuxt-design-system',
        configKey: 'nuxtDesignSystem',
        compatibility: {
            // Semver version of supported nuxt versions
            nuxt: '>=4.0.3',
        },
    },
    // Default configuration options of the Nuxt module
    defaults: {
        prefix: 'Bp',
        components: true,
        css: true,
        composables: true,
        tailwind: true,
    },
    async setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url)
        
        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addPlugin(resolver.resolve('./runtime/plugin'))
        
        // Components
        if (_options.components) {
            addComponentsDir({
                path: resolver.resolve('runtime/components'),
                prefix: _options.prefix,
                pathPrefix: false,
            })
        }

        // Tailwind CSS v4.1 setup
        if (_options.tailwind) {
            // Add Tailwind CSS Vite plugin
            addVitePlugin(tailwindcss())
            
            // Ensure the module's CSS is transpiled
            _nuxt.options.build = _nuxt.options.build || {}
            _nuxt.options.build.transpile = _nuxt.options.build.transpile || []
            _nuxt.options.build.transpile.push('@boilerplatepowa/nuxt4-design-system')
            
            // Add PostCSS configuration for Tailwind v4
            _nuxt.options.postcss = _nuxt.options.postcss || {}
            _nuxt.options.postcss.plugins = _nuxt.options.postcss.plugins || {}
            
            // Ensure Vite processes CSS correctly
            _nuxt.options.vite = _nuxt.options.vite || {}
            _nuxt.options.vite.css = _nuxt.options.vite.css || {}
            _nuxt.options.vite.css.postcss = {
                plugins: [
                    // Tailwind v4 will be handled by the Vite plugin
                ]
            }
        }

        // CSS
        if (_options.css) {
            _nuxt.options.css.push(resolver.resolve('runtime/assets/main.css'))
        }

        // Composables
        if (_options.composables) {
            addImportsDir(resolver.resolve('runtime/composables'))
        }
    },
})
