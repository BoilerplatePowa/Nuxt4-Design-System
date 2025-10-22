import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PhoneMockup from '../../src/runtime/components/Mockup/PhoneMockup.vue'

const meta: Meta<typeof PhoneMockup> = {
    title: 'Mockup/PhoneMockup',
    component: PhoneMockup,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Phone mockup shows a mockup of an iPhone. Based on DaisyUI mockup-phone component.',
            },
        },
    },
    argTypes: {
        borderColor: {
            control: { type: 'text' },
            description: 'Border color for the phone frame (e.g., #ff8938)',
        },
        displayClass: {
            control: { type: 'text' },
            description: 'Custom CSS classes for the display area',
        },
        backgroundColor: {
            control: { type: 'text' },
            description: 'Background color for the display',
        },
        textColor: {
            control: { type: 'text' },
            description: 'Text color for the display',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        backgroundColor: 'neutral-900',
        textColor: 'white',
        displayClass: 'grid place-content-center',
    },
    render: (args) => ({
        components: { PhoneMockup },
        setup() {
            return { args }
        },
        template: `
      <PhoneMockup v-bind="args">
        It's Glowtime.
      </PhoneMockup>
    `,
    }),
}

export const WithColorAndWallpaper: Story = {
    args: {
        borderColor: '#ff8938',
    },
    render: (args) => ({
        components: { PhoneMockup },
        setup() {
            return { args }
        },
        template: `
      <PhoneMockup v-bind="args">
        <img alt="wallpaper" src="https://img.daisyui.com/images/stock/453966.webp" />
      </PhoneMockup>
    `,
    }),
}

export const AppInterface: Story = {
    args: {
        backgroundColor: 'white',
    },
    render: (args) => ({
        components: { PhoneMockup },
        setup() {
            return { args }
        },
        template: `
      <PhoneMockup v-bind="args">
        <div class="bg-white h-full flex flex-col">
          <!-- Status Bar -->
          <div class="bg-gray-900 text-white text-xs p-2 flex justify-between">
            <span>9:41</span>
            <span>100%</span>
          </div>
          
          <!-- Header -->
          <div class="bg-blue-600 text-white p-4 flex items-center">
            <button class="mr-3">←</button>
            <h1 class="text-lg font-semibold">Messages</h1>
            <div class="ml-auto">⋮</div>
          </div>
          
          <!-- Content -->
          <div class="flex-1 p-4 space-y-3 overflow-y-auto">
            <div class="flex items-start space-x-2">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div class="bg-gray-100 rounded-lg p-2 max-w-xs">
                <p class="text-sm">Hey! How's it going?</p>
                <span class="text-xs text-gray-500">2:30 PM</span>
              </div>
            </div>
            
            <div class="flex items-start space-x-2 justify-end">
              <div class="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
                <p class="text-sm">Great! Just finished the presentation.</p>
                <span class="text-xs opacity-70">2:32 PM</span>
              </div>
              <div class="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
            </div>
            
            <div class="flex items-start space-x-2">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div class="bg-gray-100 rounded-lg p-2 max-w-xs">
                <p class="text-sm">Awesome! Can't wait to see it 🎉</p>
                <span class="text-xs text-gray-500">2:33 PM</span>
              </div>
            </div>
          </div>
          
          <!-- Input -->
          <div class="p-4 border-t flex items-center space-x-2">
            <input type="text" placeholder="Type a message..." class="flex-1 border rounded-full px-3 py-2 text-sm" />
            <button class="bg-blue-500 text-white rounded-full p-2">→</button>
          </div>
        </div>
      </PhoneMockup>
    `,
    }),
}

export const CustomStyling: Story = {
    args: {
        borderColor: '#3b82f6',
        backgroundColor: 'blue-50',
        textColor: 'blue-900',
        displayClass: 'flex items-center justify-center',
    },
    render: (args) => ({
        components: { PhoneMockup },
        setup() {
            return { args }
        },
        template: `
      <PhoneMockup v-bind="args">
        <div class="text-center">
          <div class="text-4xl mb-2">📱</div>
          <h3 class="text-lg font-bold">Custom Styled</h3>
          <p class="text-sm opacity-70">With custom border and colors</p>
        </div>
      </PhoneMockup>
    `,
    }),
}
