import type { Preview } from '@storybook/vue3-vite'
import '../src/runtime/assets/main.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0f172a',
        },
      ],
    },
    // Add global styles to ensure animations work properly
    layout: 'centered',
  },
  decorators: [
    (story) => ({
      template: `
        <div 
          style="
            width: 100%; 
            height: 100vh; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            min-height: 400px;
          "
        >
          <div style="max-width: 1200px; width: 100%; padding: 2rem;">
            <story />
          </div>
        </div>
      `,
    }),
  ],
}

export default preview
