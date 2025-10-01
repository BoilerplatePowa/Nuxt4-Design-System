import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Textarea from '../../src/runtime/components/DataInput/Textarea.vue'

const meta: Meta<typeof Textarea> = {
  title: 'Data Input/Textarea',
  component: Textarea,
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
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readonly: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    showCharCount: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
  },
}

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
}

export const WithHelp: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
    helpText: 'Provide a detailed description of your request',
  },
}

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    errorMessage: 'This field is required',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'This is disabled',
    disabled: true,
  },
}

export const Readonly: Story = {
  args: {
    label: 'Read Only',
    readonly: true,
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('This content cannot be edited')
      return { args, value }
    },
    template: '<Textarea v-model="value" v-bind="args" />',
  }),
}

export const SmallSize: Story = {
  args: {
    label: 'Small Textarea',
    placeholder: 'Small size',
    size: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    label: 'Large Textarea',
    placeholder: 'Large size',
    size: 'lg',
  },
}

export const Bordered: Story = {
  args: {
    label: 'Bordered',
    placeholder: 'Bordered variant',
    variant: 'bordered',
  },
}

export const Ghost: Story = {
  args: {
    label: 'Ghost',
    placeholder: 'Ghost variant',
    variant: 'ghost',
  },
}

export const Primary: Story = {
  args: {
    label: 'Primary',
    placeholder: 'Primary variant',
    variant: 'primary',
  },
}

export const WithCharacterCount: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message...',
    maxlength: 200,
    showCharCount: true,
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('This textarea shows character count')
      return { args, value }
    },
    template: '<Textarea v-model="value" v-bind="args" />',
  }),
}

export const CustomRows: Story = {
  args: {
    label: 'Large Text Area',
    placeholder: 'This textarea has more rows...',
    rows: 8,
  },
}

export const Interactive: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div class="space-y-4">
        <Textarea 
          v-model="value" 
          label="Interactive Textarea" 
          placeholder="Type something here..."
          helpText="This textarea uses v-model for two-way binding"
        />
        <div class="p-4 bg-base-200 rounded-lg">
          <p class="text-sm font-medium mb-2">Current value:</p>
          <p class="text-sm">{{ value || '(empty)' }}</p>
        </div>
      </div>
    `,
  }),
}
