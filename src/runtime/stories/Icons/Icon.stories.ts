import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Icon from '../../components/Icons/Icon.vue';

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

export const Small: Story = {
  args: {
    name: 'star',
    size: 'sm',
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: '<Icon v-bind="args" />',
  }),
};

export const Large: Story = {
  args: {
    name: 'settings',
    size: 'lg',
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: '<Icon v-bind="args" />',
  }),
};

export const Colored: Story = {
  args: {
    name: 'check-circle',
    size: 'lg',
    color: 'success',
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: '<Icon v-bind="args" />',
  }),
};

export const CustomStroke: Story = {
  args: {
    name: 'zap',
    size: 'lg',
    strokeWidth: 1.5,
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: '<Icon v-bind="args" />',
  }),
};

export const IconGrid: Story = {
  args: {
    name: 'heart',
    size: 'md',
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: `
      <div class="grid grid-cols-6 gap-4 p-4">
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
      </div>
    `,
  }),
};

export const DynamicIcons: Story = {
  args: {
    name: 'heart',
    size: 'md',
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4 p-4">
        <h3 class="text-lg font-semibold">Dynamic Icon Loading Examples</h3>
        <div class="grid grid-cols-4 gap-4">
          <Icon name="heart" size="lg" />
          <Icon name="star" size="lg" />
          <Icon name="settings" size="lg" />
          <Icon name="user" size="lg" />
        </div>
        <p class="text-sm text-gray-600">
          These icons are loaded dynamically from Lucide. Any Lucide icon name will work!
        </p>
      </div>
    `,
  }),
};

export const DifferentSizes: Story = {
  args: {
    name: 'heart',
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: `
      <div class="flex items-center gap-4 p-4">
        <Icon name="heart" size="xs" />
        <Icon name="heart" size="sm" />
        <Icon name="heart" size="md" />
        <Icon name="heart" size="lg" />
        <Icon name="heart" size="xl" />
        <Icon name="heart" size="2xl" />
      </div>
    `,
  }),
};

export const WithColors: Story = {
  args: {
    name: 'check-circle',
    size: 'lg',
  },
  render: args => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: `
      <div class="flex items-center gap-4 p-4">
        <Icon name="check-circle" size="lg" color="success" />
        <Icon name="alert-circle" size="lg" color="warning" />
        <Icon name="x-circle" size="lg" color="error" />
        <Icon name="info" size="lg" color="info" />
        <Icon name="heart" size="lg" color="primary" />
      </div>
    `,
  }),
};
