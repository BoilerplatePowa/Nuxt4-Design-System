import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Alert from '../../src/runtime/components/Feedback/Alert.vue'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible alert component with multiple variants for different message types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert variant',
    },
    title: {
      control: { type: 'text' },
      description: 'Alert title',
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Show dismiss button',
    },
    showDefaultIcon: {
      control: { type: 'boolean' },
      description: 'Show default icon',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Dismiss event',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template:
      '<Alert v-bind="args">This is an info alert with some additional information.</Alert>',
  }),
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args">Your action was completed successfully.</Alert>',
  }),
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args">Please be aware of the following issue.</Alert>',
  }),
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args">An error occurred while processing your request.</Alert>',
  }),
}

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    dismissible: true,
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args">This alert can be dismissed by clicking the X button.</Alert>',
  }),
}

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: 'No Icon',
    showDefaultIcon: false,
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: '<Alert v-bind="args">This alert has no icon.</Alert>',
  }),
}

export const WithCustomIcon: Story = {
  args: {
    variant: 'success',
    title: 'Custom Icon',
  },
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <Alert v-bind="args">
        <template #icon>
          <span class="text-2xl">🎉</span>
        </template>
        This alert has a custom icon!
      </Alert>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <Alert variant="info" title="Information">
          This is an info alert with important information.
        </Alert>
        <Alert variant="success" title="Success">
          Operation completed successfully!
        </Alert>
        <Alert variant="warning" title="Warning">
          Please review the following before proceeding.
        </Alert>
        <Alert variant="error" title="Error">
          An error occurred during the process.
        </Alert>
        <Alert variant="info" title="Dismissible" dismissible>
          This alert can be dismissed.
        </Alert>
      </div>
    `,
  }),
}
