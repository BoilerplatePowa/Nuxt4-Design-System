import {
    defineNuxtModule,
    addPlugin,
    createResolver,
    addComponentsDir,
    addImportsDir,
} from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
    prefix: string
    components: boolean
    css: boolean
    composables: boolean
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: '@boilerplatepowa/nuxt4-design-system',
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
    },
    setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url)

        // Add plugin for component initialization
        addPlugin(resolver.resolve('./runtime/plugin'))

        // Components - main feature of this module
        if (_options.components) {
            addComponentsDir({
                path: resolver.resolve('runtime/components'),
                prefix: _options.prefix,
                pathPrefix: false,
            })
        }

        // CSS - provide base styles that clients can extend
        if (_options.css) {
            _nuxt.options.css.push(resolver.resolve('runtime/assets/main.css'))
        }

        // Composables
        if (_options.composables) {
            addImportsDir(resolver.resolve('runtime/composables'))
        }
    },
})
