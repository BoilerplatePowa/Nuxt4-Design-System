import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Radio from '../../src/runtime/components/DataInput/Radio.vue'
import { ref } from 'vue'

const meta: Meta<typeof Radio> = {
    title: 'Data Input/Radio',
    component: Radio,
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
        required: {
            control: { type: 'boolean' },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Default Radio',
        value: 'default',
        name: 'default-radio',
    },
}

export const Checked: Story = {
    render: () => ({
        components: { Radio },
        setup() {
            const selectedValue = ref('checked')
            return { selectedValue }
        },
        template: `
      <Radio 
        v-model="selectedValue"
        label="Checked Radio" 
        value="checked" 
        name="checked-radio" 
      />
    `,
    }),
}

export const RadioGroup: Story = {
    render: () => ({
        components: { Radio },
        setup() {
            const selectedValue = ref('option1')
            return { selectedValue }
        },
        template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Select an option:</h3>
        <div class="space-y-2">
          <Radio 
            v-model="selectedValue"
            label="Option 1" 
            value="option1" 
            name="radio-group" 
          />
          <Radio 
            v-model="selectedValue"
            label="Option 2" 
            value="option2" 
            name="radio-group" 
          />
          <Radio 
            v-model="selectedValue"
            label="Option 3" 
            value="option3" 
            name="radio-group" 
          />
        </div>
        <p class="text-sm text-gray-600">Selected: {{ selectedValue }}</p>
      </div>
    `,
    }),
}

export const Variants: Story = {
    render: () => ({
        components: { Radio },
        setup() {
            const selectedVariant = ref('primary')
            return { selectedVariant }
        },
        template: `
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <Radio 
            v-model="selectedVariant"
            label="Primary" 
            value="primary" 
            variant="primary"
            name="variant-group" 
          />
          <Radio 
            v-model="selectedVariant"
            label="Secondary" 
            value="secondary" 
            variant="secondary"
            name="variant-group" 
          />
          <Radio 
            v-model="selectedVariant"
            label="Accent" 
            value="accent" 
            variant="accent"
            name="variant-group" 
          />
          <Radio 
            v-model="selectedVariant"
            label="Success" 
            value="success" 
            variant="success"
            name="variant-group" 
          />
          <Radio 
            v-model="selectedVariant"
            label="Warning" 
            value="warning" 
            variant="warning"
            name="variant-group" 
          />
          <Radio 
            v-model="selectedVariant"
            label="Error" 
            value="error" 
            variant="error"
            name="variant-group" 
          />
        </div>
      </div>
    `,
    }),
}

export const Sizes: Story = {
    render: () => ({
        components: { Radio },
        setup() {
            const selectedSize = ref('md')
            return { selectedSize }
        },
        template: `
      <div class="space-y-4">
        <Radio 
          v-model="selectedSize"
          label="Extra Small" 
          value="xs" 
          size="xs"
          name="size-group" 
        />
        <Radio 
          v-model="selectedSize"
          label="Small" 
          value="sm" 
          size="sm"
          name="size-group" 
        />
        <Radio 
          v-model="selectedSize"
          label="Medium" 
          value="md" 
          size="md"
          name="size-group" 
        />
        <Radio 
          v-model="selectedSize"
          label="Large" 
          value="lg" 
          size="lg"
          name="size-group" 
        />
      </div>
    `,
    }),
}

export const Disabled: Story = {
    render: () => ({
        components: { Radio },
        setup() {
            const selectedValue = ref('disabled2')
            return { selectedValue }
        },
        template: `
      <div class="space-y-2">
        <Radio 
          label="Disabled Unchecked" 
          value="disabled1" 
          name="disabled-group"
          disabled
        />
        <Radio 
          v-model="selectedValue"
          label="Disabled Checked" 
          value="disabled2" 
          name="disabled-group"
          disabled
        />
      </div>
    `,
    }),
}

export const NoLabel: Story = {
    args: {
        value: 'no-label',
        name: 'no-label-radio',
    },
}

export const WithHelpText: Story = {
    args: {
        label: 'Radio with help text',
        value: 'help-text',
        name: 'help-text-radio',
        helpText: 'This is some helpful text to guide the user.',
    },
}

export const WithError: Story = {
    args: {
        label: 'Radio with error',
        value: 'error',
        name: 'error-radio',
        errorMessage: 'This field is required.',
    },
}

export const Required: Story = {
    args: {
        label: 'Required Radio',
        value: 'required',
        name: 'required-radio',
        required: true,
    },
}
