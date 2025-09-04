import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Range from '../../src/runtime/components/DataInput/Range.vue';
import { ref } from 'vue';

const meta: Meta<typeof Range> = {
  title: 'Data Input/Range',
  component: Range,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    showValue: {
      control: { type: 'boolean' },
    },
    showTicks: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Volume',
    modelValue: 50,
    min: 0,
    max: 100,
    showValue: true,
  },
};

export const WithTicks: Story = {
  args: {
    label: 'Rating',
    modelValue: 3,
    min: 1,
    max: 5,
    step: 1,
    showValue: true,
    showTicks: true,
  },
};

export const PriceRange: Story = {
  args: {
    label: 'Price Range',
    modelValue: 500,
    min: 0,
    max: 1000,
    step: 50,
    showValue: true,
    helpText: 'Select your budget range',
  },
};

export const Percentage: Story = {
  args: {
    label: 'Progress',
    modelValue: 75,
    min: 0,
    max: 100,
    step: 5,
    showValue: true,
  },
};

export const Interactive: Story = {
  render: () => ({
    components: { Range },
    setup() {
      const volume = ref(30);
      const brightness = ref(80);
      const temperature = ref(22);

      return { volume, brightness, temperature };
    },
    template: `
      <div class="space-y-6">
        <Range 
          v-model="volume"
          label="Volume" 
          :min="0" 
          :max="100"
          :step="1"
          show-value
          variant="primary"
        />
        
        <Range 
          v-model="brightness"
          label="Brightness" 
          :min="0" 
          :max="100"
          :step="5"
          show-value
          variant="accent"
        />
        
        <Range 
          v-model="temperature"
          label="Temperature" 
          :min="10" 
          :max="30"
          :step="1"
          show-value
          variant="warning"
        />
        
        <div class="mt-6 p-4 bg-base-200 rounded-lg">
          <h4 class="font-semibold mb-2">Current Values:</h4>
          <p>Volume: {{ volume }}%</p>
          <p>Brightness: {{ brightness }}%</p>
          <p>Temperature: {{ temperature }}°C</p>
        </div>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Range },
    template: `
      <div class="space-y-4">
        <Range label="Primary" :model-value="60" variant="primary" show-value />
        <Range label="Secondary" :model-value="40" variant="secondary" show-value />
        <Range label="Accent" :model-value="70" variant="accent" show-value />
        <Range label="Success" :model-value="80" variant="success" show-value />
        <Range label="Warning" :model-value="30" variant="warning" show-value />
        <Range label="Info" :model-value="45" variant="info" show-value />
        <Range label="Error" :model-value="20" variant="error" show-value />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Range },
    template: `
      <div class="space-y-6">
        <Range label="Extra Small" :model-value="25" size="xs" show-value />
        <Range label="Small" :model-value="50" size="sm" show-value />
        <Range label="Medium" :model-value="75" size="md" show-value />
        <Range label="Large" :model-value="85" size="lg" show-value />
      </div>
    `,
  }),
};

export const WithSteps: Story = {
  args: {
    label: 'Difficulty Level',
    modelValue: 2,
    min: 1,
    max: 5,
    step: 1,
    showValue: true,
    showTicks: true,
    helpText: '1 = Easy, 5 = Expert',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Range',
    modelValue: 60,
    min: 0,
    max: 100,
    disabled: true,
    showValue: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Invalid Range',
    modelValue: 95,
    min: 0,
    max: 100,
    showValue: true,
    errorMessage: 'Value is too high. Please select a lower value.',
  },
};
