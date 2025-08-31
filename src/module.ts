import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@boilerplatepowa/nuxt-design-system',
    configKey: 'nuxtDesignSystem',
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '>=4.0.3'
    }
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

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
