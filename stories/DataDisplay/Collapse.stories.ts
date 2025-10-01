import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Collapse from '../../src/runtime/components/DataDisplay/Collapse.vue'

const meta: Meta<typeof Collapse> = {
    title: 'Data Display/Collapse',
    component: Collapse,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Expandable content container with smooth animations and customizable styling. Uses Vue 3.4 defineModel for v-model support.',
            },
        },
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'Title displayed in the collapse header',
        },
        modelValue: {
            control: 'boolean',
            description: 'Whether the collapse is open (v-model)',
        },
        forceOpen: {
            control: 'boolean',
            description: 'Force the collapse to stay open',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the collapse interaction',
        },
        variant: {
            control: { type: 'select' },
            options: ['default', 'arrow', 'plus', 'bordered', 'ghost'],
            description: 'Visual style variant',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: 'Click to expand',
        modelValue: false,
    },
    render: (args) => ({
        components: { Collapse },
        setup() {
            return { args }
        },
        template: `
      <div class="w-96">
        <Collapse v-bind="args">
          <p>This is the collapsible content. It can contain any type of content including text, images, forms, or other components.</p>
        </Collapse>
      </div>
    `,
    }),
}

export const OpenByDefault: Story = {
    args: {
        title: 'This is open by default',
        modelValue: true,
    },
    render: (args) => ({
        components: { Collapse },
        setup() {
            return { args }
        },
        template: `
      <div class="w-96">
        <Collapse v-bind="args">
          <div class="space-y-4">
            <p>This collapse starts in an open state.</p>
            <div class="alert alert-info">
              <span>You can include any content here!</span>
            </div>
          </div>
        </Collapse>
      </div>
    `,
    }),
}

export const ReactiveVModel: Story = {
    render: () => ({
        components: { Collapse },
        setup() {
            const isOpen = ref(false)
            return { isOpen }
        },
        template: `
      <div class="w-96 space-y-4">
        <div class="flex gap-2">
          <button class="btn btn-primary btn-sm" @click="isOpen = !isOpen">
            {{ isOpen ? 'Close' : 'Open' }} Programmatically
          </button>
          <span class="badge badge-neutral">State: {{ isOpen ? 'Open' : 'Closed' }}</span>
        </div>
        
        <Collapse v-model="isOpen" title="Reactive v-model Example">
          <div class="space-y-2">
            <p>This collapse uses Vue 3.4's defineModel for reactive v-model binding.</p>
            <p>Current state: <strong>{{ isOpen ? 'Open' : 'Closed' }}</strong></p>
            <div class="alert alert-success">
              <span>The state is synchronized between the button and the collapse!</span>
            </div>
          </div>
        </Collapse>
      </div>
    `,
    }),
}

export const Variants: Story = {
    render: () => ({
        components: { Collapse },
        template: `
      <div class="space-y-4 w-96">
        <Collapse title="Default Variant" variant="default">
          <p>This is the default collapse variant with standard styling.</p>
        </Collapse>
        
        <Collapse title="Bordered Variant" variant="bordered">
          <p>This collapse has a border around the entire component.</p>
        </Collapse>
        
        <Collapse title="Ghost Variant" variant="ghost">
          <p>This is a minimal ghost variant with subtle styling.</p>
        </Collapse>
      </div>
    `,
    }),
}

export const NestedCollapses: Story = {
    render: () => ({
        components: { Collapse },
        template: `
      <div class="w-96">
        <Collapse title="Main Category">
          <div class="space-y-2">
            <p>This is the main category content.</p>
            
            <Collapse title="Subcategory 1" variant="ghost">
              <p>Content for subcategory 1 with more detailed information.</p>
            </Collapse>
            
            <Collapse title="Subcategory 2" variant="ghost">
              <div class="space-y-2">
                <p>Content for subcategory 2.</p>
                <Collapse title="Sub-subcategory" variant="ghost">
                  <p>Even deeper nested content is possible!</p>
                </Collapse>
              </div>
            </Collapse>
          </div>
        </Collapse>
      </div>
    `,
    }),
}

export const WithRichContent: Story = {
    args: {
        title: '📊 Project Statistics',
        modelValue: true,
    },
    render: (args) => ({
        components: { Collapse },
        setup() {
            return { args }
        },
        template: `
      <div class="w-96">
        <Collapse v-bind="args">
          <div class="space-y-4">
            <div class="stats stats-vertical lg:stats-horizontal shadow">
              <div class="stat">
                <div class="stat-title">Downloads</div>
                <div class="stat-value">31K</div>
                <div class="stat-desc">Jan 1st - Feb 1st</div>
              </div>
              <div class="stat">
                <div class="stat-title">Users</div>
                <div class="stat-value">4,200</div>
                <div class="stat-desc">↗︎ 400 (22%)</div>
              </div>
            </div>
            
            <div class="flex gap-2">
              <button class="btn btn-primary btn-sm">View Details</button>
              <button class="btn btn-ghost btn-sm">Export Data</button>
            </div>
          </div>
        </Collapse>
      </div>
    `,
    }),
}

export const FAQ: Story = {
    render: () => ({
        components: { Collapse },
        template: `
      <div class="space-y-2 w-96">
        <h3 class="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
        
        <Collapse title="What is your return policy?" variant="bordered">
          <p>We offer a 30-day return policy for all items. Items must be in their original condition and packaging.</p>
        </Collapse>
        
        <Collapse title="How long does shipping take?" variant="bordered">
          <div class="space-y-2">
            <p><strong>Standard Shipping:</strong> 3-5 business days</p>
            <p><strong>Express Shipping:</strong> 1-2 business days</p>
            <p><strong>International:</strong> 7-14 business days</p>
          </div>
        </Collapse>
        
        <Collapse title="Do you offer customer support?" variant="bordered">
          <div class="space-y-2">
            <p>Yes! Our customer support team is available:</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Email: support@example.com</li>
              <li>Phone: 1-800-123-4567</li>
              <li>Live Chat: Available 24/7</li>
            </ul>
          </div>
        </Collapse>
        
        <Collapse title="Can I track my order?" variant="bordered">
          <p>Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard.</p>
        </Collapse>
      </div>
    `,
    }),
}

export const Disabled: Story = {
    args: {
        title: 'This collapse is disabled',
        disabled: true,
    },
    render: (args) => ({
        components: { Collapse },
        setup() {
            return { args }
        },
        template: `
      <div class="w-96">
        <Collapse v-bind="args">
          <p>This content cannot be accessed because the collapse is disabled.</p>
        </Collapse>
      </div>
    `,
    }),
}
