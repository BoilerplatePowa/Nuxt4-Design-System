import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Status from '../../src/runtime/components/DataDisplay/Status.vue';

const meta: Meta<typeof Status> = {
  title: 'Data Display/Status',
  component: Status,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A status indicator component for showing online/offline states and other status information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'],
      description: 'Status variant color',
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'bounce', 'none'],
      description: 'Animation type',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Status size',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessibility label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Default: Story = {
  render: args => ({
    components: { Status },
    setup() {
      return { args };
    },
    template: `
      <Status v-bind="args" />
    `,
  }),
  args: {
    variant: 'neutral',
    animation: 'none',
    size: 'md',
    ariaLabel: 'status',
  },
};

export const AllVariants: Story = {
  render: () => ({
    components: { Status },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4">
          <Status variant="primary" aria-label="status" />
          <Status variant="secondary" aria-label="status" />
          <Status variant="accent" aria-label="status" />
          <Status variant="neutral" aria-label="status" />
        </div>
        <div class="flex flex-wrap gap-4">
          <Status variant="info" aria-label="info" />
          <Status variant="success" aria-label="success" />
          <Status variant="warning" aria-label="warning" />
          <Status variant="error" aria-label="error" />
        </div>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { Status },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-bold mb-2">All Sizes</h3>
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs">xs</span>
            <Status variant="success" size="xs" aria-label="status" />
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs">sm</span>
            <Status variant="success" size="sm" aria-label="status" />
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs">md</span>
            <Status variant="success" size="md" aria-label="status" />
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs">lg</span>
            <Status variant="success" size="lg" aria-label="status" />
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs">xl</span>
            <Status variant="success" size="xl" aria-label="status" />
          </div>
        </div>
      </div>
    `,
  }),
};

export const AllAnimations: Story = {
  render: () => ({
    components: { Status },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-bold mb-2">All Animations</h3>
        <div class="flex flex-wrap gap-4">
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs">pulse</span>
            <Status variant="info" animation="pulse" aria-label="status" />
          </div>
          <div class="flex flex-col items-center gap-2">
            <span class="text-xs">bounce</span>
            <Status variant="success" animation="bounce" aria-label="status" />
          </div>

          <div class="flex flex-col items-center gap-2">
            <span class="text-xs">none</span>
            <Status variant="error" animation="none" aria-label="status" />
          </div>
        </div>
      </div>
    `,
  }),
};

export const SimpleExamples: Story = {
  render: () => ({
    components: { Status },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-bold mb-2">Basic Status Indicators</h3>
          <div class="flex flex-wrap gap-4">
            <Status variant="primary" aria-label="status" />
            <Status variant="secondary" aria-label="status" />
            <Status variant="accent" aria-label="status" />
            <Status variant="neutral" aria-label="status" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-2">Semantic Status Indicators</h3>
          <div class="flex flex-wrap gap-4">
            <Status variant="info" aria-label="info" />
            <Status variant="success" aria-label="success" />
            <Status variant="warning" aria-label="warning" />
            <Status variant="error" aria-label="error" />
          </div>
        </div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    components: { Status },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-bold mb-2">Interactive Status Indicators</h3>
        <div class="flex flex-wrap gap-4">
          <Status variant="info" aria-label="info" class="cursor-pointer hover:opacity-80" />
          <Status variant="success" aria-label="success" class="cursor-pointer hover:opacity-80" />
          <Status variant="warning" aria-label="warning" class="cursor-pointer hover:opacity-80" />
          <Status variant="error" aria-label="error" class="cursor-pointer hover:opacity-80" />
        </div>
      </div>
    `,
  }),
};

export const CombinedVariants: Story = {
  render: () => ({
    components: { Status },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-bold mb-2">Different Sizes with Animations</h3>
          <div class="flex flex-wrap items-center gap-4">
            <Status variant="success" size="xs" animation="pulse" aria-label="status" />
            <Status variant="info" size="sm" animation="bounce" aria-label="status" />
            <Status variant="warning" size="md" animation="bounce" aria-label="status" />
            <Status variant="error" size="lg" animation="none" aria-label="status" />
            <Status variant="primary" size="xl" animation="pulse" aria-label="status" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-2">Animated Status Indicators</h3>
          <div class="flex flex-wrap gap-4">
            <Status variant="info" animation="pulse" aria-label="info" />
            <Status variant="success" animation="bounce" aria-label="success" />
            <Status variant="warning" animation="bounce" aria-label="warning" />
            <Status variant="error" animation="pulse" aria-label="error" />
          </div>
        </div>
      </div>
    `,
  }),
};
