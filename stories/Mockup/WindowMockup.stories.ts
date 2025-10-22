import type { Meta, StoryObj } from '@storybook/vue3-vite'
import WindowMockup from '../../src/runtime/components/Mockup/WindowMockup.vue'

const meta: Meta<typeof WindowMockup> = {
    title: 'Mockup/WindowMockup',
    component: WindowMockup,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Window mockup shows a box that looks like an operating system window. Based on DaisyUI mockup-window component.'
            }
        }
    },
    argTypes: {
        isBordered: {
            control: { type: 'boolean' },
            description: 'Add border styling to the window mockup'
        },
        hasBackground: {
            control: { type: 'boolean' },
            description: 'Add background color to the window mockup'
        },
        class: {
            control: { type: 'text' },
            description: 'Custom CSS classes'
        }
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: (args) => ({
        components: { WindowMockup },
        setup() {
            return { args }
        },
        template: `
      <WindowMockup v-bind="args">
        <div class="grid place-content-center border-t border-base-300 h-80">Hello!</div>
      </WindowMockup>
    `,
    }),
}

export const WithBorder: Story = {
    args: {
        isBordered: true
    },
    render: (args) => ({
        components: { WindowMockup },
        setup() {
            return { args }
        },
        template: `
      <WindowMockup v-bind="args" class="w-full">
        <div class="grid place-content-center border-t border-base-300 h-80">Hello!</div>
      </WindowMockup>
    `,
    }),
}

export const WithBackground: Story = {
    args: {
        hasBackground: true
    },
    render: (args) => ({
        components: { WindowMockup },
        setup() {
            return { args }
        },
        template: `
      <WindowMockup v-bind="args">
        <div class="grid place-content-center h-80">Hello!</div>
      </WindowMockup>
    `,
    }),
}

export const TextEditor: Story = {
    render: () => ({
        components: { WindowMockup },
        template: `
      <WindowMockup isBordered class="w-full">
        <div class="bg-base-100 p-4 h-80">
          <div class="flex items-center justify-between text-sm text-base-content/70 mb-4 pb-2 border-b">
            <span>File Edit View Help</span>
            <span>Ln 1, Col 1</span>
          </div>
          <div class="font-mono text-sm leading-relaxed">
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div>Sed do eiusmod tempor incididunt ut labore et dolore magna</div>
            <div>aliqua. Ut enim ad minim veniam, quis nostrud exercitation</div>
            <div>ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            <div class="bg-primary/20 inline">|</div>
          </div>
        </div>
      </WindowMockup>
    `,
    }),
}

export const AllVariants: Story = {
    render: () => ({
        components: { WindowMockup },
        template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Default</h3>
          <WindowMockup>
            <div class="grid place-content-center border-t border-base-300 h-80">Hello!</div>
          </WindowMockup>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">With Border</h3>
          <WindowMockup isBordered class="w-full">
            <div class="grid place-content-center border-t border-base-300 h-80">Hello!</div>
          </WindowMockup>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">With Background</h3>
          <WindowMockup hasBackground>
            <div class="grid place-content-center h-80">Hello!</div>
          </WindowMockup>
        </div>
      </div>
    `,
    }),
}
