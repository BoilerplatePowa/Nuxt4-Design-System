import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Select from '../../src/runtime/components/DataInput/Select.vue'

const meta: Meta<typeof Select> = {
    title: 'Data Input/Select',
    component: Select,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
          'A flexible select component with multiple variants and support for options. Uses Vue 3.4 defineModel() for v-model support.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        'options': {
            control: { type: 'object' },
            description: 'Array of options',
        },
        'label': {
            control: { type: 'text' },
            description: 'Select label',
        },
        'placeholder': {
            control: { type: 'text' },
            description: 'Placeholder text',
        },
        'helpText': {
            control: { type: 'text' },
            description: 'Help text',
        },
        'errorMessage': {
            control: { type: 'text' },
            description: 'Error message',
        },
        'disabled': {
            control: { type: 'boolean' },
            description: 'Disabled state',
        },
        'required': {
            control: { type: 'boolean' },
            description: 'Required field',
        },
        'multiple': {
            control: { type: 'boolean' },
            description: 'Multiple selection',
        },
        'size': {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg'],
            description: 'Select size',
        },
        'variant': {
            control: { type: 'select' },
            options: [
                'bordered',
                'ghost',
                'primary',
                'secondary',
                'accent',
                'info',
                'success',
                'warning',
                'error',
            ],
            description: 'Select variant',
        },
        'onUpdate:modelValue': {
            action: 'update:modelValue',
        },
        'onChange': {
            action: 'change',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
]

export const Default: Story = {
    args: {
        label: 'Choose an option',
        placeholder: 'Select an option...',
        options: sampleOptions,
    },
}

export const WithValue: Story = {
    args: {
        label: 'Pre-selected option',
        options: sampleOptions,
    },
    render: args => ({
        components: { Select },
        setup() {
            return { args }
        },
        template: '<Select v-model="value" v-bind="args" />',
        data() {
            return {
                value: '2',
            }
        },
    }),
}

export const Required: Story = {
    args: {
        label: 'Required field',
        placeholder: 'You must select something...',
        required: true,
        options: sampleOptions,
    },
}

export const WithError: Story = {
    args: {
        label: 'Field with error',
        errorMessage: 'Please select a valid option',
        options: sampleOptions,
    },
}

export const WithHelp: Story = {
    args: {
        label: 'Field with help',
        helpText: 'Choose the option that best fits your needs',
        options: sampleOptions,
    },
}

export const Disabled: Story = {
    args: {
        label: 'Disabled select',
        disabled: true,
        options: sampleOptions,
    },
}

export const Multiple: Story = {
    args: {
        label: 'Multiple selection',
        multiple: true,
        options: sampleOptions,
    },
    render: args => ({
        components: { Select },
        setup() {
            return { args }
        },
        template: '<Select v-model="value" v-bind="args" />',
        data() {
            return {
                value: ['1', '3'],
            }
        },
    }),
}

export const Small: Story = {
    args: {
        label: 'Small select',
        size: 'sm',
        options: sampleOptions,
    },
}

export const Large: Story = {
    args: {
        label: 'Large select',
        size: 'lg',
        options: sampleOptions,
    },
}

export const Primary: Story = {
    args: {
        label: 'Primary variant',
        variant: 'primary',
        options: sampleOptions,
    },
}

export const Success: Story = {
    args: {
        label: 'Success variant',
        variant: 'success',
        options: sampleOptions,
    },
}

export const AllVariants: Story = {
    render: () => ({
        components: { Select },
        setup() {
            const options = sampleOptions
            return { options }
        },
        template: `
      <div class="space-y-6 w-full max-w-md">
        <div>
          <h3 class="text-lg font-semibold mb-3">Variants</h3>
          <div class="space-y-4">
            <Select label="Bordered" variant="bordered" :options="options" />
            <Select label="Ghost" variant="ghost" :options="options" />
            <Select label="Primary" variant="primary" :options="options" />
            <Select label="Secondary" variant="secondary" :options="options" />
            <Select label="Accent" variant="accent" :options="options" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Status Colors</h3>
          <div class="space-y-4">
            <Select label="Info" variant="info" :options="options" />
            <Select label="Success" variant="success" :options="options" />
            <Select label="Warning" variant="warning" :options="options" />
            <Select label="Error" variant="error" :options="options" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="space-y-4">
            <Select label="Extra Small" size="xs" :options="options" />
            <Select label="Small" size="sm" :options="options" />
            <Select label="Medium" size="md" :options="options" />
            <Select label="Large" size="lg" :options="options" />
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-3">States</h3>
          <div class="space-y-4">
            <Select label="Required" required :options="options" />
            <Select label="Disabled" disabled :options="options" />
            <Select label="Multiple" multiple :options="options" />
            <Select label="With Error" errorMessage="Something went wrong" :options="options" />
            <Select label="With Help" helpText="This is helpful information" :options="options" />
          </div>
        </div>
      </div>
    `,
    }),
}
