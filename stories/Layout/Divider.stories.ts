import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Divider from '../../src/runtime/components/Layout/Divider.vue'

const meta: Meta<typeof Divider> = {
    title: 'Layout/Divider',
    component: Divider,
    parameters: {
        layout: 'padded',
        docs: {
          description: {
              component:
                  'DaisyUI divider wrapper with Vue 3.5 defineModel() support.'
          }
      }
    },
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: { type: 'select' },
            options: ['horizontal', 'vertical'],
        },
        variant: {
            control: { type: 'select' },
            options: [
                'neutral',
                'primary',
                'secondary',
                'accent',
                'success',
                'warning',
                'info',
                'error',
            ],
        },
        position: {
            control: { type: 'select' },
            options: ['start', 'center', 'end'],
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => ({
        components: { Divider },
        template: `
      <div>
        <p>Content above the divider</p>
        <Divider />
        <p>Content below the divider</p>
      </div>
    `,
    }),
}

export const WithText: Story = {
    args: {
        text: 'OR',
    },
    render: (args) => ({
        components: { Divider },
        setup() {
            return { args }
        },
        template: `
      <div>
        <p>Login with your account</p>
        <Divider v-bind="args" />
        <p>Create a new account</p>
      </div>
    `,
    }),
}

export const Vertical: Story = {
    render: () => ({
        components: { Divider },
        template: `
      <div class="flex items-center h-32">
        <div class="flex-1 text-center">
          <p>Left content</p>
        </div>
        <Divider orientation="vertical" />
        <div class="flex-1 text-center">
          <p>Right content</p>
        </div>
      </div>
    `,
    }),
}

export const VerticalWithText: Story = {
    render: () => ({
        components: { Divider },
        template: `
      <div class="flex items-center h-32">
        <div class="flex-1 text-center">
          <p>Section A</p>
        </div>
        <Divider orientation="vertical" text="OR" />
        <div class="flex-1 text-center">
          <p>Section B</p>
        </div>
      </div>
    `,
    }),
}

export const Positions: Story = {
    render: () => ({
        components: { Divider },
        template: `
      <div class="space-y-8">
        <div>
          <p>Content above</p>
          <Divider text="Start Position" position="start" />
          <p>Content below</p>
        </div>
        
        <div>
          <p>Content above</p>
          <Divider text="Center Position" position="center" />
          <p>Content below</p>
        </div>
        
        <div>
          <p>Content above</p>
          <Divider text="End Position" position="end" />
          <p>Content below</p>
        </div>
      </div>
    `,
    }),
}

export const Variants: Story = {
    render: () => ({
        components: { Divider },
        template: `
      <div class="space-y-6">
        <div>
          <Divider text="Primary" variant="primary" />
        </div>
        <div>
          <Divider text="Secondary" variant="secondary" />
        </div>
        <div>
          <Divider text="Accent" variant="accent" />
        </div>
        <div>
          <Divider text="Success" variant="success" />
        </div>
        <div>
          <Divider text="Warning" variant="warning" />
        </div>
        <div>
          <Divider text="Info" variant="info" />
        </div>
        <div>
          <Divider text="Error" variant="error" />
        </div>
      </div>
    `,
    }),
}

export const CustomContent: Story = {
    render: () => ({
        components: { Divider },
        template: `
      <div>
        <p>Custom content in divider</p>
        <Divider>
          <span class="bg-base-100 px-4 text-sm font-medium">🎉 Custom Content 🎉</span>
        </Divider>
        <p>More content below</p>
      </div>
    `,
    }),
}
