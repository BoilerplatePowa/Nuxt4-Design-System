// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
    features: {
    // Rules for module authors
        tooling: true,
        // Rules for formatting
        stylistic: true,
    },
    dirs: {
        src: [
            './playground',
        ],
    },
})
    .append({
        rules: {
            // Configure indentation to use 4 spaces
            '@stylistic/indent': ['error', 4],
            '@stylistic/indent-binary-ops': ['error', 4],
            '@stylistic/jsx-indent-props': ['error', 4],
            // Vue-specific indentation rules
            'vue/script-indent': ['error', 4, {
                baseIndent: 0,
                switchCase: 1,
                ignores: [],
            }],
            'vue/html-indent': ['error', 4, {
                attribute: 1,
                baseIndent: 0,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            }],
            // Disable conflicting rules
            'indent': 'off',
            'vue/multi-word-component-names': 'off',
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
