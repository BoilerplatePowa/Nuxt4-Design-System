import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Tooltip from '../../src/runtime/components/Feedback/Tooltip.vue'

const meta: Meta<typeof Tooltip> = {
    title: 'Feedback/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        position: {
            control: { type: 'select' },
            options: ['top', 'bottom', 'left', 'right'],
        },
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
        },
        open: {
            control: { type: 'boolean' },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        tip: 'This is a tooltip',
    },
    render: args => ({
        components: { Tooltip },
        setup() {
            return { args }
        },
        template: `
      <Tooltip v-bind="args">
        <button class="btn">Hover me</button>
      </Tooltip>
    `,
    }),
}

export const Positions: Story = {
    render: () => ({
        components: { Tooltip },
        template: `
      <div class="flex flex-col gap-8 items-center">
        <Tooltip tip="Top tooltip" position="top">
          <button class="btn">Top</button>
        </Tooltip>
        
        <div class="flex gap-8 items-center">
          <Tooltip tip="Left tooltip" position="left">
            <button class="btn">Left</button>
          </Tooltip>
          
          <Tooltip tip="Right tooltip" position="right">
            <button class="btn">Right</button>
          </Tooltip>
        </div>
        
        <Tooltip tip="Bottom tooltip" position="bottom">
          <button class="btn">Bottom</button>
        </Tooltip>
      </div>
    `,
    }),
}

export const Variants: Story = {
    render: () => ({
        components: { Tooltip },
        template: `
      <div class="flex flex-wrap gap-4">
        <Tooltip tip="Primary tooltip" variant="primary">
          <button class="btn btn-primary">Primary</button>
        </Tooltip>
        
        <Tooltip tip="Secondary tooltip" variant="secondary">
          <button class="btn btn-secondary">Secondary</button>
        </Tooltip>
        
        <Tooltip tip="Accent tooltip" variant="accent">
          <button class="btn btn-accent">Accent</button>
        </Tooltip>
        
        <Tooltip tip="Info tooltip" variant="info">
          <button class="btn btn-info">Info</button>
        </Tooltip>
        
        <Tooltip tip="Success tooltip" variant="success">
          <button class="btn btn-success">Success</button>
        </Tooltip>
        
        <Tooltip tip="Warning tooltip" variant="warning">
          <button class="btn btn-warning">Warning</button>
        </Tooltip>
        
        <Tooltip tip="Error tooltip" variant="error">
          <button class="btn btn-error">Error</button>
        </Tooltip>
      </div>
    `,
    }),
}

export const AlwaysOpen: Story = {
    args: {
        tip: 'This tooltip is always visible',
        open: true,
    },
    render: args => ({
        components: { Tooltip },
        setup() {
            return { args }
        },
        template: `
      <Tooltip v-bind="args">
        <button class="btn">Always visible tooltip</button>
      </Tooltip>
    `,
    }),
}

export const LongText: Story = {
    args: {
        tip: 'This is a very long tooltip text that demonstrates how tooltips handle longer content gracefully',
    },
    render: args => ({
        components: { Tooltip },
        setup() {
            return { args }
        },
        template: `
      <Tooltip v-bind="args">
        <button class="btn">Long tooltip</button>
      </Tooltip>
    `,
    }),
}
