import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Indicator from '../../src/runtime/components/Layout/Indicator.vue'

const meta: Meta<typeof Indicator> = {
    title: 'Layout/Indicator',
    component: Indicator,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Indicator component for placing elements on the corner of another element. Supports status indicators, badges, and custom content.',
            },
        },
    },
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['status', 'badge', 'custom'],
            description: 'Type of indicator to display',
        },
        content: {
            control: { type: 'text' },
            description: 'Content to display in the indicator',
        },
        horizontal: {
            control: { type: 'select' },
            options: ['start', 'center', 'end'],
            description: 'Horizontal position of the indicator',
        },
        vertical: {
            control: { type: 'select' },
            options: ['top', 'middle', 'bottom'],
            description: 'Vertical position of the indicator',
        },
        variant: {
            control: { type: 'select' },
            options: [
                'primary',
                'secondary',
                'accent',
                'neutral',
                'info',
                'success',
                'warning',
                'error',
            ],
            description: 'Badge variant (for badge type)',
        },
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg'],
            description: 'Badge size (for badge type)',
        },
        statusVariant: {
            control: { type: 'select' },
            options: [
                'neutral',
                'primary',
                'secondary',
                'accent',
                'info',
                'success',
                'warning',
                'error',
            ],
            description: 'Status variant (for status type)',
        },
        statusSize: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg'],
            description: 'Status size (for status type)',
        },
        showIndicator: {
            control: { type: 'boolean' },
            description: 'Show or hide the indicator',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        type: 'badge',
        content: '5',
        variant: 'primary',
        size: 'md',
        horizontal: 'end',
        vertical: 'top',
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

export const StatusIndicator: Story = {
    render: () => ({
        components: { Indicator },
        template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <Indicator type="status" statusVariant="success" statusSize="sm">
          <div class="bg-base-300 grid h-32 w-32 place-items-center">Online</div>
        </Indicator>
        
        <Indicator type="status" statusVariant="warning" statusSize="sm">
          <div class="bg-base-300 grid h-32 w-32 place-items-center">Away</div>
        </Indicator>
        
        <Indicator type="status" statusVariant="error" statusSize="sm">
          <div class="bg-base-300 grid h-32 w-32 place-items-center">Offline</div>
        </Indicator>
        
        <Indicator type="status" statusVariant="info" statusSize="sm">
          <div class="bg-base-300 grid h-32 w-32 place-items-center">Busy</div>
        </Indicator>
      </div>
    `,
    }),
}

export const BadgeNotifications: Story = {
    render: () => ({
        components: { Indicator },
        template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <Indicator type="badge" content="3" variant="error">
          <button class="btn btn-primary">Notifications</button>
        </Indicator>
        
        <Indicator type="badge" content="12" variant="warning">
          <button class="btn btn-secondary">Messages</button>
        </Indicator>
        
        <Indicator type="badge" content="99+" variant="success">
          <button class="btn btn-accent">Updates</button>
        </Indicator>
        
        <Indicator type="badge" content="*" variant="info" size="xs">
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
        <Indicator type="badge" content="1" horizontal="start" vertical="top">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">TL</div>
        </Indicator>
        
        <Indicator type="badge" content="2" horizontal="center" vertical="top">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">TC</div>
        </Indicator>
        
        <Indicator type="badge" content="3" horizontal="end" vertical="top">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">TR</div>
        </Indicator>
        
        <Indicator type="badge" content="4" horizontal="start" vertical="middle">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">ML</div>
        </Indicator>
        
        <Indicator type="badge" content="5" horizontal="center" vertical="middle">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">MC</div>
        </Indicator>
        
        <Indicator type="badge" content="6" horizontal="end" vertical="middle">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">MR</div>
        </Indicator>
        
        <Indicator type="badge" content="7" horizontal="start" vertical="bottom">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">BL</div>
        </Indicator>
        
        <Indicator type="badge" content="8" horizontal="center" vertical="bottom">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">BC</div>
        </Indicator>
        
        <Indicator type="badge" content="9" horizontal="end" vertical="bottom">
          <div class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">BR</div>
        </Indicator>
      </div>
    `,
    }),
}

export const BadgeVariants: Story = {
    render: () => ({
        components: { Indicator },
        template: `
      <div class="flex flex-wrap gap-6 items-center justify-center">
        <Indicator type="badge" content="1" variant="primary">
          <button class="btn btn-outline">Primary</button>
        </Indicator>
        
        <Indicator type="badge" content="2" variant="secondary">
          <button class="btn btn-outline">Secondary</button>
        </Indicator>
        
        <Indicator type="badge" content="3" variant="accent">
          <button class="btn btn-outline">Accent</button>
        </Indicator>
        
        <Indicator type="badge" content="4" variant="info">
          <button class="btn btn-outline">Info</button>
        </Indicator>
        
        <Indicator type="badge" content="5" variant="success">
          <button class="btn btn-outline">Success</button>
        </Indicator>
        
        <Indicator type="badge" content="6" variant="warning">
          <button class="btn btn-outline">Warning</button>
        </Indicator>
        
        <Indicator type="badge" content="7" variant="error">
          <button class="btn btn-outline">Error</button>
        </Indicator>
      </div>
    `,
    }),
}

export const BadgeSizes: Story = {
    render: () => ({
        components: { Indicator },
        template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <Indicator type="badge" content="XS" size="xs" variant="primary">
          <button class="btn">Extra Small</button>
        </Indicator>
        
        <Indicator type="badge" content="SM" size="sm" variant="secondary">
          <button class="btn">Small</button>
        </Indicator>
        
        <Indicator type="badge" content="MD" size="md" variant="accent">
          <button class="btn">Medium</button>
        </Indicator>
        
        <Indicator type="badge" content="LG" size="lg" variant="warning">
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
        <Indicator type="custom">
          <template #indicator>
            <span class="indicator-item badge badge-primary">NEW</span>
          </template>
          <button class="btn">Product</button>
        </Indicator>
        
        <Indicator type="custom">
          <template #indicator>
            <span class="indicator-item badge badge-success">OK</span>
          </template>
          <button class="btn">Verified</button>
        </Indicator>
        
        <Indicator type="custom">
          <template #indicator>
            <span class="indicator-item badge badge-error">!</span>
          </template>
          <button class="btn">Alert</button>
        </Indicator>
        
        <Indicator type="custom">
          <template #indicator>
            <span class="indicator-item badge badge-warning">!</span>
          </template>
          <button class="btn">Warning</button>
        </Indicator>
      </div>
    `,
    }),
}

export const ForButton: Story = {
    render: () => ({
        components: { Indicator },
        template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <Indicator type="badge" content="12" variant="secondary">
          <button class="btn">inbox</button>
        </Indicator>
        
        <Indicator type="badge" content="3" variant="error">
          <button class="btn btn-primary">Notifications</button>
        </Indicator>
        
        <Indicator type="badge" content="99+" variant="warning">
          <button class="btn btn-secondary">Updates</button>
        </Indicator>
      </div>
    `,
    }),
}

export const ForTab: Story = {
    render: () => ({
        components: { Indicator },
        template: `
      <div class="tabs tabs-lift">
        <a class="tab">Messages</a>
        <Indicator type="badge" content="8" variant="primary">
          <a class="tab tab-active">Notifications</a>
        </Indicator>
        <a class="tab">Requests</a>
      </div>
    `,
    }),
}

export const ForAvatar: Story = {
    render: () => ({
        components: { Indicator },
        template: `
      <div class="flex gap-8 items-center justify-center">
        <Indicator type="badge" content="Justice" variant="secondary" horizontal="end" vertical="bottom">
          <div class="avatar">
            <div class="h-20 w-20 rounded-lg">
              <img src="https://img.daisyui.com/images/profile/demo/avatar-1.jpg" alt="User" />
            </div>
          </div>
        </Indicator>
        
        <Indicator type="status" statusVariant="success" statusSize="sm" horizontal="end" vertical="bottom">
          <div class="avatar">
            <div class="h-20 w-20 rounded-lg">
              <img src="https://img.daisyui.com/images/profile/demo/avatar-2.jpg" alt="User" />
            </div>
          </div>
        </Indicator>
      </div>
    `,
    }),
}

export const ForInput: Story = {
    render: () => ({
        components: { Indicator },
        template: `
      <div class="flex flex-col gap-8 items-center justify-center">
        <Indicator type="badge" content="Required" variant="error">
          <input type="text" placeholder="Your email address" class="input input-bordered" />
        </Indicator>
        
        <Indicator type="badge" content="Optional" variant="info">
          <input type="text" placeholder="Your name" class="input input-bordered" />
        </Indicator>
      </div>
    `,
    }),
}

export const Responsive: Story = {
    render: () => ({
        components: { Indicator },
        template: `
      <div class="flex gap-8 items-center justify-center">
        <Indicator 
          type="badge" 
          content="Responsive" 
          variant="secondary"
          class="indicator-item indicator-start sm:indicator-middle md:indicator-bottom lg:indicator-center xl:indicator-end"
        >
          <div class="bg-base-300 grid h-32 w-32 place-items-center">content</div>
        </Indicator>
      </div>
    `,
    }),
}

export const AllPositions: Story = {
    render: () => ({
        components: { Indicator },
        template: `
      <div class="indicator">
        <span class="indicator-item indicator-top indicator-start badge">↖︎</span>
        <span class="indicator-item indicator-top indicator-center badge">↑</span>
        <span class="indicator-item indicator-top indicator-end badge">↗︎</span>
        <span class="indicator-item indicator-middle indicator-start badge">←</span>
        <span class="indicator-item indicator-middle indicator-center badge">●</span>
        <span class="indicator-item indicator-middle indicator-end badge">→</span>
        <span class="indicator-item indicator-bottom indicator-start badge">↙︎</span>
        <span class="indicator-item indicator-bottom indicator-center badge">↓</span>
        <span class="indicator-item indicator-bottom indicator-end badge">↘︎</span>
        <div class="bg-base-300 grid h-32 w-60 place-items-center">Box</div>
      </div>
    `,
    }),
}
