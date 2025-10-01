import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Loading from '../../src/runtime/components/Feedback/Loading.vue'

const meta: Meta<typeof Loading> = {
  title: 'Feedback/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    text: {
      control: { type: 'text' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'spinner',
    size: 'md',
  },
}

export const WithText: Story = {
  args: {
    variant: 'spinner',
    size: 'md',
    text: 'Loading...',
  },
}

export const Variants: Story = {
  render: () => ({
    components: { Loading },
    template: `
      <div class="flex flex-wrap gap-8 items-center justify-center">
        <div class="text-center">
          <Loading variant="spinner" />
          <p class="mt-2 text-sm">Spinner</p>
        </div>
        
        <div class="text-center">
          <Loading variant="dots" />
          <p class="mt-2 text-sm">Dots</p>
        </div>
        
        <div class="text-center">
          <Loading variant="ring" />
          <p class="mt-2 text-sm">Ring</p>
        </div>
        
        <div class="text-center">
          <Loading variant="ball" />
          <p class="mt-2 text-sm">Ball</p>
        </div>
        
        <div class="text-center">
          <Loading variant="bars" />
          <p class="mt-2 text-sm">Bars</p>
        </div>
        
        <div class="text-center">
          <Loading variant="infinity" />
          <p class="mt-2 text-sm">Infinity</p>
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Loading },
    template: `
      <div class="flex gap-8 items-center justify-center">
        <div class="text-center">
          <Loading variant="spinner" size="xs" />
          <p class="mt-2 text-sm">XS</p>
        </div>
        
        <div class="text-center">
          <Loading variant="spinner" size="sm" />
          <p class="mt-2 text-sm">SM</p>
        </div>
        
        <div class="text-center">
          <Loading variant="spinner" size="md" />
          <p class="mt-2 text-sm">MD</p>
        </div>
        
        <div class="text-center">
          <Loading variant="spinner" size="lg" />
          <p class="mt-2 text-sm">LG</p>
        </div>
      </div>
    `,
  }),
}

export const InContext: Story = {
  render: () => ({
    components: { Loading },
    template: `
      <div class="space-y-8">
        <!-- Button Loading -->
        <div class="text-center">
          <h3 class="text-lg font-bold mb-4">Button Loading States</h3>
          <div class="flex gap-4 justify-center">
            <button class="btn btn-primary">
              <Loading variant="spinner" size="sm" />
              Loading...
            </button>
            
            <button class="btn btn-secondary">
              <Loading variant="dots" size="sm" />
              Processing...
            </button>
            
            <button class="btn btn-accent">
              <Loading variant="ring" size="sm" />
              Saving...
            </button>
          </div>
        </div>
        
        <!-- Card Loading -->
        <div class="max-w-md mx-auto">
          <h3 class="text-lg font-bold mb-4 text-center">Card Loading</h3>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body text-center">
              <Loading variant="spinner" size="lg" />
              <h2 class="card-title justify-center">Loading Content</h2>
              <p>Please wait while we fetch your data...</p>
            </div>
          </div>
        </div>
        
        <!-- Full Page Loading -->
        <div class="h-64 bg-base-200 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <Loading variant="dots" size="lg" />
            <p class="mt-4 text-lg">Loading application...</p>
          </div>
        </div>
      </div>
    `,
  }),
}
