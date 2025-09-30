import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config: StorybookConfig = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
    ],
    framework: {
        name: '@storybook/vue3-vite',
        options: {},
    },
    core: {
        builder: '@storybook/builder-vite',
    },
    async viteFinal(config: any) {
        const { default: tailwindcss } = await import('@tailwindcss/vite')

        return mergeConfig(config, {
            plugins: [
                tailwindcss(),
                vue(),
            ],
            server: {
                cors: true,
                origin: 'http://localhost:6006',
            },
            // Ensure proper module resolution
            resolve: {
                alias: {
                    '~': '/src',
                    '@': '/src',
                },
            },
        })
    },
}
export default config
