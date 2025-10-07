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

        // Tailwind CSS v4.1 setup - MUST come before CSS addition
        if (_options.tailwind) {
            // Add Tailwind CSS Vite plugin FIRST
            addVitePlugin(tailwindcss())
            
            // Ensure the module is transpiled
            _nuxt.options.build = _nuxt.options.build || {}
            _nuxt.options.build.transpile = _nuxt.options.build.transpile || []
            _nuxt.options.build.transpile.push('@boilerplatepowa/nuxt4-design-system')
            _nuxt.options.build.transpile.push('tailwindcss')
            _nuxt.options.build.transpile.push('daisyui')
        }

        // CSS - Add AFTER Tailwind plugin
        if (_options.css) {
            // Resolve the CSS file path
            const cssPath = resolver.resolve('runtime/assets/main.css')
            
            // Add CSS to the beginning of the array so it's processed first
            _nuxt.options.css.unshift(cssPath)
            
            // Ensure Vite knows to process this CSS file
            _nuxt.options.vite = _nuxt.options.vite || {}
            _nuxt.options.vite.optimizeDeps = _nuxt.options.vite.optimizeDeps || {}
            _nuxt.options.vite.optimizeDeps.include = _nuxt.options.vite.optimizeDeps.include || []
            _nuxt.options.vite.optimizeDeps.include.push('daisyui')
        }

        // Composables
        if (_options.composables) {
            addImportsDir(resolver.resolve('runtime/composables'))
        }
    },
})
