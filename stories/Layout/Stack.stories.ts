import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Stack from '../../src/runtime/components/Layout/Stack.vue'

const meta: Meta<typeof Stack> = {
    title: 'Layout/Stack',
    component: Stack,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Stack visually puts elements on top of each other. Based on DaisyUI 5 stack component.',
            },
        },
    },
    argTypes: {
        modifier: {
            control: { type: 'select' },
            options: ['stack-top', 'stack-bottom', 'stack-start', 'stack-end'],
            description: 'DaisyUI stack modifier for alignment',
        },
        class: {
            control: { type: 'text' },
            description: 'Custom CSS classes',
        },
    },
    args: {
        modifier: 'stack-bottom',
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        modifier: 'stack-bottom',
    },
    render: (args) => ({
        components: { Stack },
        setup() {
            return { args }
        },
        template: `
      <div class="flex justify-center items-center min-h-32">
        <Stack v-bind="args" class="h-20 w-32">
          <div class="bg-primary text-primary-content grid place-content-center rounded-box">1</div>
          <div class="bg-accent text-accent-content grid place-content-center rounded-box">2</div>
          <div class="bg-secondary text-secondary-content grid place-content-center rounded-box">3</div>
        </Stack>
      </div>
    `,
    }),
}

export const StackedImages: Story = {
    args: {
        modifier: 'stack-bottom',
    },
    render: (args) => ({
        components: { Stack },
        setup() {
            return { args }
        },
        template: `
      <div class="flex justify-center items-center min-h-32">
        <Stack v-bind="args" class="w-48">
          <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" class="rounded-box" />
          <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" class="rounded-box" />
          <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" class="rounded-box" />
        </Stack>
      </div>
    `,
    }),
}

export const StackedCards: Story = {
    args: {
        modifier: 'stack-bottom',
    },
    render: (args) => ({
        components: { Stack },
        setup() {
            return { args }
        },
        template: `
      <div class="flex justify-center items-center min-h-32">
        <Stack v-bind="args" class="size-28">
          <div class="border-base-content card bg-base-100 border text-center">
            <div class="card-body">A</div>
          </div>
          <div class="border-base-content card bg-base-100 border text-center">
            <div class="card-body">B</div>
          </div>
          <div class="border-base-content card bg-base-100 border text-center">
            <div class="card-body">C</div>
          </div>
        </Stack>
      </div>
    `,
    }),
}

export const Modifiers: Story = {
    render: () => ({
        components: { Stack },
        template: `
      <div class="space-y-8">
        <div class="flex flex-col items-center">
          <h3 class="text-lg font-bold mb-4">Stack Bottom (Default)</h3>
          <Stack modifier="stack-bottom" class="h-20 w-32">
            <div class="bg-primary text-primary-content grid place-content-center rounded-box">1</div>
            <div class="bg-accent text-accent-content grid place-content-center rounded-box">2</div>
            <div class="bg-secondary text-secondary-content grid place-content-center rounded-box">3</div>
          </Stack>
        </div>
        
        <div class="flex flex-col items-center">
          <h3 class="text-lg font-bold mb-4">Stack Top</h3>
          <Stack modifier="stack-top" class="h-20 w-32">
            <div class="bg-primary text-primary-content grid place-content-center rounded-box">1</div>
            <div class="bg-accent text-accent-content grid place-content-center rounded-box">2</div>
            <div class="bg-secondary text-secondary-content grid place-content-center rounded-box">3</div>
          </Stack>
        </div>
        
        <div class="flex flex-col items-center">
          <h3 class="text-lg font-bold mb-4">Stack Start</h3>
          <Stack modifier="stack-start" class="h-20 w-32">
            <div class="bg-primary text-primary-content grid place-content-center rounded-box">1</div>
            <div class="bg-accent text-accent-content grid place-content-center rounded-box">2</div>
            <div class="bg-secondary text-secondary-content grid place-content-center rounded-box">3</div>
          </Stack>
        </div>
        
        <div class="flex flex-col items-center">
          <h3 class="text-lg font-bold mb-4">Stack End</h3>
          <Stack modifier="stack-end" class="h-20 w-32">
            <div class="bg-primary text-primary-content grid place-content-center rounded-box">1</div>
            <div class="bg-accent text-accent-content grid place-content-center rounded-box">2</div>
            <div class="bg-secondary text-secondary-content grid place-content-center rounded-box">3</div>
          </Stack>
        </div>
      </div>
    `,
    }),
}

export const Notifications: Story = {
    args: {
        modifier: 'stack-bottom',
    },
    render: (args) => ({
        components: { Stack },
        setup() {
            return { args }
        },
        template: `
      <div class="flex justify-center items-center min-h-32">
        <Stack v-bind="args" class="w-80">
          <div class="card shadow-md bg-base-100">
            <div class="card-body">
              <h2 class="card-title">Notification 1</h2>
              <p>You have 3 unread messages. Tap here to see.</p>
            </div>
          </div>
          <div class="card shadow-md bg-base-100">
            <div class="card-body">
              <h2 class="card-title">Notification 2</h2>
              <p>You have 3 unread messages. Tap here to see.</p>
            </div>
          </div>
          <div class="card shadow-md bg-base-100">
            <div class="card-body">
              <h2 class="card-title">Notification 3</h2>
              <p>You have 3 unread messages. Tap here to see.</p>
            </div>
          </div>
        </Stack>
      </div>
    `,
    }),
}

export const Playground: Story = {
    args: {
        modifier: 'stack-bottom',
        class: 'h-20 w-32',
    },
}
