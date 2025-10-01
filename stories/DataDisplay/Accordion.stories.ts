import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Accordion from '../../src/runtime/components/DataDisplay/Accordion.vue'

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Collapsible content component with customizable panels and smooth animations. Supports v-model for controlled state management with explicit openItem naming.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of accordion items with title and content',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple panels to be open simultaneously',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'compact'],
      description: 'Accordion variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Accordion size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the accordion',
    },
    id: {
      control: 'text',
      description: 'Custom ID for the accordion (for accessibility and testing)',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  {
    value: '1',
    title: 'What is your return policy?',
    content:
      'We offer a 30-day return policy for all unused items in original packaging. Return shipping is free for defective items.',
  },
  {
    value: '2',
    title: 'How long does shipping take?',
    content:
      'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.',
  },
  {
    value: '3',
    title: 'Do you ship internationally?',
    content:
      'Yes, we ship to over 50 countries worldwide. International shipping times vary by location.',
  },
]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const WithVModel: Story = {
  render: () => ({
    components: { Accordion },
    data() {
      return {
        selectedValue: '2',
        items: sampleItems,
      }
    },
    template: `
      <div class="space-y-4">
        <div class="text-sm">
          <strong>Selected value:</strong> {{ selectedValue || 'None' }}
        </div>
        <Accordion 
          v-model="selectedValue"
          :items="items"
        />
        <div class="flex gap-2">
          <button 
            class="btn btn-sm btn-outline"
            @click="selectedValue = '1'"
          >
            Select Item 1
          </button>
          <button 
            class="btn btn-sm btn-outline"
            @click="selectedValue = '2'"
          >
            Select Item 2
          </button>
          <button 
            class="btn btn-sm btn-outline"
            @click="selectedValue = '3'"
          >
            Select Item 3
          </button>
          <button 
            class="btn btn-sm btn-outline"
            @click="selectedValue = null"
          >
            Close All
          </button>
        </div>
      </div>
    `,
  }),
}

export const Multiple: Story = {
  args: {
    items: sampleItems,
    multiple: true,
  },
}

export const Bordered: Story = {
  args: {
    items: sampleItems,
    variant: 'bordered',
  },
}

export const Compact: Story = {
  args: {
    items: sampleItems,
    variant: 'compact',
  },
}

export const WithRichContent: Story = {
  args: {
    items: [
      {
        value: '1',
        title: '🚀 Getting Started',
        content: `
          <div class="space-y-4">
            <p>Welcome to our platform! Here's how to get started:</p>
            <ol class="list-decimal list-inside space-y-2">
              <li>Create your account</li>
              <li>Verify your email</li>
              <li>Complete your profile</li>
              <li>Start exploring!</li>
            </ol>
            <div class="alert alert-info">
              <span>💡 Tip: Check out our tutorial videos for a quick overview!</span>
            </div>
          </div>
        `,
      },
      {
        value: '2',
        title: '💳 Billing & Payments',
        content: `
          <div class="space-y-4">
            <p>We accept the following payment methods:</p>
            <div class="grid grid-cols-2 gap-4">
              <div class="card bg-base-200 p-4">
                <h4 class="font-semibold">Credit Cards</h4>
                <p class="text-sm">Visa, MasterCard, American Express</p>
              </div>
              <div class="card bg-base-200 p-4">
                <h4 class="font-semibold">Digital Wallets</h4>
                <p class="text-sm">PayPal, Apple Pay, Google Pay</p>
              </div>
            </div>
          </div>
        `,
      },
    ],
  },
}

export const Large: Story = {
  args: {
    items: [
      {
        value: '1',
        title: 'Privacy Policy',
        content: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        `,
      },
      {
        value: '2',
        title: 'Terms of Service',
        content: `
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        `,
      },
    ],
  },
}

export const MultipleAccordions: Story = {
  render: () => ({
    components: { Accordion },
    data() {
      return {
        faqValue: 'faq-1',
        productValue: 'product-1',
      }
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">FAQ Section</h3>
          <Accordion 
            id="faq-accordion"
            v-model="faqValue"
            :items="[
              {
                value: 'faq-1',
                title: 'How do I reset my password?',
                content: 'Click on the &quot;Forgot Password&quot; link on the login page and follow the instructions sent to your email.'
              },
              {
                value: 'faq-2',
                title: 'Can I change my subscription plan?',
                content: 'Yes, you can upgrade or downgrade your subscription plan at any time from your account settings.'
              }
            ]"
          />
          <div class="mt-2 text-sm text-gray-600">
            Selected FAQ: {{ faqValue || 'None' }}
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Product Information</h3>
          <Accordion 
            id="product-accordion"
            v-model="productValue"
            variant="bordered"
            :items="[
              {
                value: 'product-1',
                title: 'Product Specifications',
                content: 'Detailed technical specifications and features of our products.'
              },
              {
                value: 'product-2',
                title: 'Installation Guide',
                content: 'Step-by-step installation instructions and requirements.'
              }
            ]"
          />
          <div class="mt-2 text-sm text-gray-600">
            Selected Product: {{ productValue || 'None' }}
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Support</h3>
          <Accordion 
            id="support-accordion"
            variant="compact"
            multiple
            :items="[
              {
                value: 'support-1',
                title: 'Contact Information',
                content: 'Email: support@example.com | Phone: 1-800-123-4567'
              },
              {
                value: 'support-2',
                title: 'Business Hours',
                content: 'Monday - Friday: 9 AM - 6 PM EST'
              },
              {
                value: 'support-3',
                title: 'Emergency Support',
                content: 'For urgent issues, please call our 24/7 emergency line.'
              }
            ]"
          />
        </div>
      </div>
    `,
  }),
}

export const WithEventHandling: Story = {
  render: () => ({
    components: { Accordion },
    data() {
      return {
        selectedValue: null,
        lastEvent: null,
        items: sampleItems,
      }
    },
    methods: {
      handleItemToggle(item: any, index: number, isOpen: boolean) {
        this.lastEvent = { item: item.title, index, isOpen }
      },
    },
    template: `
      <div class="space-y-4">
        <div class="text-sm">
          <strong>Selected value:</strong> {{ selectedValue || 'None' }}
        </div>
        <Accordion 
          v-model="selectedValue"
          :items="items"
          @item-toggle="handleItemToggle"
        />
        <div v-if="lastEvent" class="alert alert-info">
          <span>
            Last event: {{ lastEvent.item }} (index: {{ lastEvent.index }}) - {{ lastEvent.isOpen ? 'Opened' : 'Closed' }}
          </span>
        </div>
      </div>
    `,
  }),
}
