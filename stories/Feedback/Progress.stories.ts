import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Progress from './Progress.vue';

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible progress bar component with multiple variants and display options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
    },
    label: {
      control: { type: 'text' },
      description: 'Progress label',
    },
    helpText: {
      control: { type: 'text' },
      description: 'Help text below progress',
    },
    showValue: {
      control: { type: 'boolean' },
      description: 'Show current value',
    },
    valueFormat: {
      control: { type: 'select' },
      options: ['percentage', 'fraction', 'raw'],
      description: 'Value display format',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Progress size',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
      description: 'Progress variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    label: 'Progress',
  },
};

export const WithValue: Story = {
  args: {
    value: 75,
    label: 'Download Progress',
    showValue: true,
  },
};

export const WithHelp: Story = {
  args: {
    value: 30,
    label: 'Upload Progress',
    helpText: 'Uploading your files...',
    showValue: true,
  },
};

export const Fraction: Story = {
  args: {
    value: 7,
    max: 10,
    label: 'Steps Completed',
    showValue: true,
    valueFormat: 'fraction',
  },
};

export const Small: Story = {
  args: {
    value: 60,
    size: 'sm',
    label: 'Small Progress',
  },
};

export const Large: Story = {
  args: {
    value: 80,
    size: 'lg',
    label: 'Large Progress',
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    label: 'Completed',
    showValue: true,
  },
};

export const Warning: Story = {
  args: {
    value: 90,
    variant: 'warning',
    label: 'Nearly Full',
    showValue: true,
  },
};

export const Error: Story = {
  args: {
    value: 25,
    variant: 'error',
    label: 'Error State',
    showValue: true,
  },
};

export const AllVariants: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-6 w-full max-w-md">
        <div>
          <h3 class="text-lg font-semibold mb-3">Colors</h3>
          <div class="space-y-4">
            <Progress :value="30" variant="primary" label="Primary" showValue />
            <Progress :value="45" variant="secondary" label="Secondary" showValue />
            <Progress :value="60" variant="accent" label="Accent" showValue />
            <Progress :value="75" variant="info" label="Info" showValue />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Status</h3>
          <div class="space-y-4">
            <Progress :value="100" variant="success" label="Success" showValue />
            <Progress :value="85" variant="warning" label="Warning" showValue />
            <Progress :value="20" variant="error" label="Error" showValue />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="space-y-4">
            <Progress :value="50" size="xs" label="Extra Small" />
            <Progress :value="50" size="sm" label="Small" />
            <Progress :value="50" size="md" label="Medium" />
            <Progress :value="50" size="lg" label="Large" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Value Formats</h3>
          <div class="space-y-4">
            <Progress :value="65" label="Percentage" showValue valueFormat="percentage" />
            <Progress :value="7" :max="10" label="Fraction" showValue valueFormat="fraction" />
            <Progress :value="1024" :max="2048" label="Raw Value" showValue valueFormat="raw" />
          </div>
        </div>
      </div>
    `,
  }),
};
