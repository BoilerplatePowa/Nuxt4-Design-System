// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
    features: {
        // Rules for module authors
        tooling: true,
        // Rules for formatting
        stylistic: true,
    },
    dirs: {
        src: ['./playground'],
    },
})
    .append(eslintPluginPrettier)
    .append({
        rules: {
            // Disable stylistic rules that conflict with Prettier
            '@stylistic/indent': 'off',
            '@stylistic/indent-binary-ops': 'off',
            '@stylistic/jsx-indent-props': 'off',
            'vue/script-indent': 'off',
            'vue/html-indent': 'off',
            indent: 'off',

            // Component naming
            'vue/multi-word-component-names': 'off',

            // Prettier handles all formatting
            'prettier/prettier': 'error',

            // Disable unified-signatures rule that crashes on Vue 3 defineEmits
            '@typescript-eslint/unified-signatures': 'off',
        },
    })
    .append({
        ignores: [
            'node_modules', // always safe
            '.nuxt', // Nuxt dev build
            '.output', // Nuxt server build
            'dist', // static build
            'coverage', // test coverage
            'test',
            'stories',
            '.storybook',
        ],
    })
