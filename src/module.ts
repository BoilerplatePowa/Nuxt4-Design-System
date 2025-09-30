import { defineNuxtModule, addPlugin, createResolver, addComponentsDir, addImportsDir, addVitePlugin } from '@nuxt/kit'
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
    setup(_options, _nuxt) {
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

        // CSS
        if (_options.css) {
            _nuxt.options.css.push(resolver.resolve('runtime/assets/main.css'))
        }

        // Composables
        if (_options.composables) {
            addImportsDir(resolver.resolve('runtime/composables'))
        }

        // Tailwind CSS v4.1 setup
        if (_options.tailwind) {
            addVitePlugin(tailwindcss())
        }
    },
})
