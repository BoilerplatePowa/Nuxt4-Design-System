import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Rating from '../../src/runtime/components/DataInput/Rating.vue';
import { ref } from 'vue';

const meta: Meta<typeof Rating> = {
  title: 'Data Input/Rating',
  component: Rating,
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
      options: ['star', 'heart', 'mask'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readonly: {
      control: { type: 'boolean' },
    },
    allowEmpty: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Rate this product',
    modelValue: 0,
    maxRating: 5,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Customer Rating',
    modelValue: 4,
    maxRating: 5,
    readonly: true,
  },
};

export const Interactive: Story = {
  render: () => ({
    components: { Rating },
    setup() {
      const rating = ref(3);
      return { rating };
    },
    template: `
      <div class="space-y-4">
        <Rating 
          v-model="rating"
          label="Rate your experience" 
          :max-rating="5"
          allow-empty
        />
        <p class="text-sm text-gray-600">
          Current rating: {{ rating }} star{{ rating !== 1 ? 's' : '' }}
        </p>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Rating },
    template: `
      <div class="space-y-6">
        <Rating label="Extra Small" :model-value="4" size="xs" readonly />
        <Rating label="Small" :model-value="4" size="sm" readonly />
        <Rating label="Medium" :model-value="4" size="md" readonly />
        <Rating label="Large" :model-value="4" size="lg" readonly />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Rating },
    template: `
      <div class="space-y-4">
        <Rating label="Star" :model-value="4" variant="star" readonly />
        <Rating label="Heart" :model-value="4" variant="heart" readonly />
        <Rating label="Mask" :model-value="4" variant="mask" readonly />
      </div>
    `,
  }),
};

export const MaxRatings: Story = {
  render: () => ({
    components: { Rating },
    template: `
      <div class="space-y-4">
        <Rating label="3 Stars Max" :model-value="2" :max-rating="3" readonly />
        <Rating label="5 Stars Max" :model-value="4" :max-rating="5" readonly />
        <Rating label="10 Stars Max" :model-value="7" :max-rating="10" readonly />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { Rating },
    setup() {
      const normalRating = ref(3);
      return { normalRating };
    },
    template: `
      <div class="space-y-6">
        <Rating 
          v-model="normalRating"
          label="Normal (Interactive)" 
          :max-rating="5"
        />
        
        <Rating 
          label="Read Only" 
          :model-value="4" 
          :max-rating="5"
          readonly
        />
        
        <Rating 
          label="Disabled" 
          :model-value="2" 
          :max-rating="5"
          disabled
        />
      </div>
    `,
  }),
};

export const AllowEmpty: Story = {
  render: () => ({
    components: { Rating },
    setup() {
      const rating = ref(0);
      return { rating };
    },
    template: `
      <div class="space-y-4">
        <Rating 
          v-model="rating"
          label="Rate with empty option" 
          :max-rating="5"
          allow-empty
        />
        <p class="text-sm text-gray-600">
          Rating: {{ rating === 0 ? 'Not rated' : rating + ' stars' }}
        </p>
      </div>
    `,
  }),
};

export const ProductRating: Story = {
  render: () => ({
    components: { Rating },
    template: `
      <div class="bg-base-200 p-6 rounded-lg max-w-md">
        <h3 class="text-lg font-semibold mb-4">Product Review</h3>
        
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm">Overall</span>
            <Rating :model-value="4" size="sm" readonly />
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm">Quality</span>
            <Rating :model-value="5" size="sm" readonly />
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm">Value</span>
            <Rating :model-value="4" size="sm" readonly />
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm">Shipping</span>
            <Rating :model-value="3" size="sm" readonly />
          </div>
        </div>
        
        <div class="mt-4 pt-3 border-t">
          <p class="text-xs text-gray-500">Based on 127 reviews</p>
        </div>
      </div>
    `,
  }),
};
