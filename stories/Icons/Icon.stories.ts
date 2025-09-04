import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Icon from '../../src/runtime/components/Icons/Icon.vue';

const meta: Meta<typeof Icon> = {
  title: 'Icons/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible icon component that wraps Lucide icons with consistent styling and props.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Icon name from Lucide library',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Icon size',
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 3, step: 0.5 },
      description: 'Stroke width of the icon',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'],
      description: 'Text color class',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessibility label',
    },
    ariaHidden: {
      control: { type: 'boolean' },
      description: 'Hide from screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default icon for playground
export const Default: Story = {
  args: {
    name: 'heart',
    size: 'md',
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: '<Icon v-bind="args" />',
  }),
};

// Sizes showcase
export const Sizes: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="space-y-3">
        <h3 class="text-lg font-semibold mb-2">Size Variants</h3>
        <div class="flex items-center gap-3">
          <Icon name="heart" size="xs" />
          <Icon name="heart" size="sm" />
          <Icon name="heart" size="md" />
          <Icon name="heart" size="lg" />
          <Icon name="heart" size="xl" />
          <Icon name="heart" size="2xl" />
        </div>
      </div>
    `,
  }),
};

// Colors showcase
export const Colors: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="space-y-3">
        <h3 class="text-lg font-semibold mb-2">Color Variants</h3>
        <div class="flex items-center gap-3">
          <Icon name="check-circle" size="lg" color="success" />
          <Icon name="alert-circle" size="lg" color="warning" />
          <Icon name="x-circle" size="lg" color="error" />
          <Icon name="info" size="lg" color="info" />
          <Icon name="heart" size="lg" color="primary" />
          <Icon name="star" size="lg" color="secondary" />
          <Icon name="settings" size="lg" color="accent" />
        </div>
      </div>
    `,
  }),
};

// Icon collection
export const IconCollection: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="space-y-3">
        <h3 class="text-lg font-semibold mb-2">Common Icons</h3>
        <div class="grid grid-cols-8 gap-3 p-2">
          <Icon name="heart" size="md" />
          <Icon name="star" size="md" />
          <Icon name="settings" size="md" />
          <Icon name="user" size="md" />
          <Icon name="home" size="md" />
          <Icon name="search" size="md" />
          <Icon name="mail" size="md" />
          <Icon name="phone" size="md" />
          <Icon name="calendar" size="md" />
          <Icon name="clock" size="md" />
          <Icon name="map-pin" size="md" />
          <Icon name="download" size="md" />
          <Icon name="upload" size="md" />
          <Icon name="edit" size="md" />
          <Icon name="delete" size="md" />
          <Icon name="plus" size="md" />
          <Icon name="minus" size="md" />
          <Icon name="check" size="md" />
          <Icon name="x" size="md" />
          <Icon name="menu" size="md" />
          <Icon name="info" size="md" />
          <Icon name="help-circle" size="md" />
          <Icon name="ice-cream" size="md" />
          <Icon name="zap" size="md" />
        </div>
      </div>
    `,
  }),
};

// Interactive playground
export const Playground: Story = {
  args: {
    name: 'heart',
    size: 'md',
    color: undefined,
    strokeWidth: 2,
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-3">
        <Icon v-bind="args" />
        <div class="text-sm text-gray-600">
          Use the controls above to customize this icon
        </div>
      </div>
    `,
  }),
};
