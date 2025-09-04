import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from '../../src/runtime/components/DataDisplay/Badge.vue';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible badge component for labels, tags, and status indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'neutral',
        'primary',
        'secondary',
        'accent',
        'ghost',
        'info',
        'success',
        'warning',
        'error',
      ],
      description: 'Badge variant',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Badge size',
    },
    outline: {
      control: { type: 'boolean' },
      description: 'Outline style',
    },
    tag: {
      control: { type: 'select' },
      options: ['span', 'div', 'p', 'label'],
      description: 'HTML element to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Primary</Badge>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Secondary</Badge>',
  }),
};

export const Accent: Story = {
  args: {
    variant: 'accent',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Accent</Badge>',
  }),
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Success</Badge>',
  }),
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Error</Badge>',
  }),
};

export const Outline: Story = {
  args: {
    variant: 'primary',
    outline: true,
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Outline</Badge>',
  }),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Large Badge</Badge>',
  }),
};

export const Small: Story = {
  args: {
    size: 'xs',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">XS</Badge>',
  }),
};

export const DifferentTags: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-semibold mb-3">Different HTML Elements</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <Badge tag="span">Span Badge</Badge>
            <Badge tag="div">Div Badge</Badge>
            <Badge tag="p">Paragraph Badge</Badge>
            <Badge tag="label">Label Badge</Badge>
          </div>
        </div>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Colors</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Status</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="flex flex-wrap gap-2 items-center">
            <Badge size="xs">XS</Badge>
            <Badge size="sm">SM</Badge>
            <Badge size="md">MD</Badge>
            <Badge size="lg">LG</Badge>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Outline</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="primary" outline>Primary</Badge>
            <Badge variant="secondary" outline>Secondary</Badge>
            <Badge variant="accent" outline>Accent</Badge>
            <Badge variant="success" outline>Success</Badge>
            <Badge variant="error" outline>Error</Badge>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">HTML Elements</h3>
          <div class="flex flex-wrap gap-2">
            <Badge tag="span">Span</Badge>
            <Badge tag="div">Div</Badge>
            <Badge tag="p">Paragraph</Badge>
            <Badge tag="label">Label</Badge>
          </div>
        </div>
      </div>
    `,
  }),
};
