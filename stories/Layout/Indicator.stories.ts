import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Indicator from '../../src/runtime/components/Layout/Indicator.vue'

const meta: Meta<typeof Indicator> = {
  title: 'Layout/Indicator',
  component: Indicator,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: [
        'top-start',
        'top-center',
        'top-end',
        'middle-start',
        'middle-center',
        'middle-end',
        'bottom-start',
        'bottom-center',
        'bottom-end',
      ],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    showIndicator: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: '5',
  },
  render: (args) => ({
    components: { Indicator },
    setup() {
      return { args }
    },
    template: `
      <Indicator v-bind="args">
        <button class="btn">Messages</button>
      </Indicator>
    `,
  }),
}

export const BadgeNotifications: Story = {
  render: () => ({
    components: { Indicator },
    template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <Indicator content="3" variant="error">
          <button class="btn btn-primary">Notifications</button>
        </Indicator>
        
        <Indicator content="12" variant="warning">
          <button class="btn btn-secondary">Messages</button>
        </Indicator>
        
        <Indicator content="99+" variant="success">
          <button class="btn btn-accent">Updates</button>
        </Indicator>
        
        <Indicator content="*" variant="info" size="xs">
          <button class="btn btn-ghost">Status</button>
        </Indicator>
      </div>
    `,
  }),
}

export const Positions: Story = {
  render: () => ({
    components: { Indicator },
    template: `
      <div class="grid grid-cols-3 gap-8 items-center justify-items-center">
        <Indicator content="1" position="top-start">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">TL</div>
        </Indicator>
        
        <Indicator content="2" position="top-center">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">TC</div>
        </Indicator>
        
        <Indicator content="3" position="top-end">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">TR</div>
        </Indicator>
        
        <Indicator content="4" position="middle-start">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">ML</div>
        </Indicator>
        
        <Indicator content="5" position="middle-center">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">MC</div>
        </Indicator>
        
        <Indicator content="6" position="middle-end">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">MR</div>
        </Indicator>
        
        <Indicator content="7" position="bottom-start">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">BL</div>
        </Indicator>
        
        <Indicator content="8" position="bottom-center">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">BC</div>
        </Indicator>
        
        <Indicator content="9" position="bottom-end">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">BR</div>
        </Indicator>
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Indicator },
    template: `
      <div class="flex flex-wrap gap-6 items-center justify-center">
        <Indicator content="1" variant="primary">
          <button class="btn btn-outline">Primary</button>
        </Indicator>
        
        <Indicator content="2" variant="secondary">
          <button class="btn btn-outline">Secondary</button>
        </Indicator>
        
        <Indicator content="3" variant="accent">
          <button class="btn btn-outline">Accent</button>
        </Indicator>
        
        <Indicator content="4" variant="info">
          <button class="btn btn-outline">Info</button>
        </Indicator>
        
        <Indicator content="5" variant="success">
          <button class="btn btn-outline">Success</button>
        </Indicator>
        
        <Indicator content="6" variant="warning">
          <button class="btn btn-outline">Warning</button>
        </Indicator>
        
        <Indicator content="7" variant="error">
          <button class="btn btn-outline">Error</button>
        </Indicator>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Indicator },
    template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <Indicator content="XS" size="xs" variant="primary">
          <button class="btn">Extra Small</button>
        </Indicator>
        
        <Indicator content="SM" size="sm" variant="secondary">
          <button class="btn">Small</button>
        </Indicator>
        
        <Indicator content="MD" size="md" variant="accent">
          <button class="btn">Medium</button>
        </Indicator>
        
        <Indicator content="LG" size="lg" variant="warning">
          <button class="btn">Large</button>
        </Indicator>
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  render: () => ({
    components: { Indicator },
    template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <Indicator>
          <template #indicator>
            <span class="indicator-item badge badge-primary">NEW</span>
          </template>
          <button class="btn">Product</button>
        </Indicator>
        
        <Indicator>
          <template #indicator>
            <span class="indicator-item badge badge-success">OK</span>
          </template>
          <button class="btn">Verified</button>
        </Indicator>
        
        <Indicator>
          <template #indicator>
            <span class="indicator-item badge badge-error">!</span>
          </template>
          <button class="btn">Alert</button>
        </Indicator>
        
        <Indicator>
          <template #indicator>
            <span class="indicator-item badge badge-warning">!</span>
          </template>
          <button class="btn">Warning</button>
        </Indicator>
      </div>
    `,
  }),
}

export const AvatarWithStatus: Story = {
  render: () => ({
    components: { Indicator },
    template: `
      <div class="flex gap-8 items-center justify-center">
        <Indicator variant="success" size="sm" position="bottom-end">
          <div class="avatar">
            <div class="w-16 rounded-full">
              <img src="https://via.placeholder.com/64" alt="User 1" />
            </div>
          </div>
        </Indicator>
        
        <Indicator variant="warning" size="sm" position="bottom-end">
          <div class="avatar">
            <div class="w-16 rounded-full">
              <img src="https://via.placeholder.com/64" alt="User 2" />
            </div>
          </div>
        </Indicator>
        
        <Indicator variant="error" size="sm" position="bottom-end">
          <div class="avatar">
            <div class="w-16 rounded-full">
              <img src="https://via.placeholder.com/64" alt="User 3" />
            </div>
          </div>
        </Indicator>
      </div>
    `,
  }),
}

export const ShoppingCart: Story = {
  render: () => ({
    components: { Indicator },
    template: `
      <div class="flex gap-8 items-center justify-center">
        <Indicator content="3" variant="error" position="top-end">
          <button class="btn btn-square btn-ghost">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.2 5M7 13l1.2-5m0 0h12M16 21a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </Indicator>
        
        <Indicator content="7" variant="primary" position="top-end">
          <button class="btn btn-square btn-ghost">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </Indicator>
        
        <Indicator content="12" variant="warning" position="top-end">
          <button class="btn btn-square btn-ghost">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM15 7h5l-5-5v5z" />
            </svg>
          </button>
        </Indicator>
      </div>
    `,
  }),
}
