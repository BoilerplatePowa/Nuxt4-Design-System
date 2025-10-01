import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Countdown from '../../src/runtime/components/DataDisplay/Countdown.vue'

const meta: Meta<typeof Countdown> = {
  title: 'Data Display/Countdown',
  component: Countdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Countdown timer component with customizable target date and styling options.',
      },
    },
  },
  argTypes: {
    targetDate: {
      control: 'date',
      description: 'Target date for the countdown',
    },
    showDays: {
      control: 'boolean',
      description: 'Show days in the countdown',
    },
    showHours: {
      control: 'boolean',
      description: 'Show hours in the countdown',
    },
    showMinutes: {
      control: 'boolean',
      description: 'Show minutes in the countdown',
    },
    showSeconds: {
      control: 'boolean',
      description: 'Show seconds in the countdown',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the countdown display',
    },
    message: {
      control: 'text',
      description: 'Message to display with countdown',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show labels for time units',
    },
    autoStart: {
      control: 'boolean',
      description: 'Auto-start the countdown',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Create a date 24 hours from now
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

export const Default: Story = {
  args: {
    targetDate: tomorrow.toISOString(),
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
  },
}

export const OnlyTime: Story = {
  args: {
    targetDate: (() => {
      const date = new Date()
      date.setHours(date.getHours() + 2)
      return date.toISOString()
    })(),
    showDays: false,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
  },
}

export const DaysOnly: Story = {
  args: {
    targetDate: (() => {
      const date = new Date()
      date.setDate(date.getDate() + 10)
      return date.toISOString()
    })(),
    showDays: true,
    showHours: false,
    showMinutes: false,
    showSeconds: false,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { Countdown },
    data() {
      const targetDate = new Date()
      targetDate.setHours(targetDate.getHours() + 5)
      return {
        targetDate: targetDate.toISOString(),
      }
    },
    template: `
      <div class="space-y-8">
        <div class="text-center">
          <h4 class="mb-4">Small</h4>
          <Countdown 
            :targetDate="targetDate" 
            size="sm"
            :showDays="false"
          />
        </div>
        
        <div class="text-center">
          <h4 class="mb-4">Medium (Default)</h4>
          <Countdown 
            :targetDate="targetDate" 
            size="md"
            :showDays="false"
          />
        </div>
        
        <div class="text-center">
          <h4 class="mb-4">Large</h4>
          <Countdown 
            :targetDate="targetDate" 
            size="lg"
            :showDays="false"
          />
        </div>
        
        <div class="text-center">
          <h4 class="mb-4">Extra Large</h4>
          <Countdown 
            :targetDate="targetDate" 
            size="xl"
            :showDays="false"
          />
        </div>
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Countdown },
    data() {
      const targetDate = new Date()
      targetDate.setHours(targetDate.getHours() + 3)
      return {
        targetDate: targetDate.toISOString(),
      }
    },
    template: `
      <div class="space-y-8">
        <div class="text-center">
          <h4 class="mb-4">Default</h4>
          <Countdown 
            :targetDate="targetDate" 
            message="Default style"
            :showDays="false"
          />
        </div>
        
        <div class="text-center">
          <h4 class="mb-4">Bordered</h4>
          <Countdown 
            :targetDate="targetDate" 
            message="With border"
            :showDays="false"
          />
        </div>
        
        <div class="text-center">
          <h4 class="mb-4">Ghost</h4>
          <Countdown 
            :targetDate="targetDate" 
            :showLabels="true"
            :showDays="false"
          />
        </div>
      </div>
    `,
  }),
}

export const EventCountdown: Story = {
  render: () => ({
    components: { Countdown },
    data() {
      const eventDate = new Date()
      eventDate.setDate(eventDate.getDate() + 7)
      eventDate.setHours(19, 0, 0, 0) // 7 PM
      return {
        eventDate: eventDate.toISOString(),
      }
    },
    template: `
      <div class="text-center p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
        <h2 class="text-3xl font-bold mb-2">🎉 Special Event</h2>
        <p class="text-lg mb-6 opacity-90">Join us for an amazing celebration!</p>
        
        <Countdown 
          :targetDate="eventDate" 
          size="lg"
          variant="ghost"
          class="text-white"
        />
        
        <div class="mt-6">
          <button class="btn btn-white btn-lg">Register Now</button>
        </div>
      </div>
    `,
  }),
}

export const ProductLaunch: Story = {
  render: () => ({
    components: { Countdown },
    data() {
      const launchDate = new Date()
      launchDate.setDate(launchDate.getDate() + 3)
      launchDate.setHours(12, 0, 0, 0) // Noon
      return {
        launchDate: launchDate.toISOString(),
      }
    },
    template: `
      <div class="max-w-md mx-auto">
        <div class="card bg-base-100 shadow-xl">
          <figure class="px-6 pt-6">
            <div class="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span class="text-4xl">🚀</span>
            </div>
          </figure>
          <div class="card-body text-center">
            <h2 class="card-title justify-center">New Product Launch</h2>
            <p class="text-gray-600">Get ready for something amazing!</p>
            
            <div class="my-4">
              <Countdown 
                :targetDate="launchDate" 
                size="md"
                :showLabels="true"
              />
            </div>
            
            <div class="card-actions justify-center">
              <button class="btn btn-primary">Notify Me</button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const SaleCountdown: Story = {
  render: () => ({
    components: { Countdown },
    data() {
      const saleEnd = new Date()
      saleEnd.setHours(saleEnd.getHours() + 8)
      return {
        saleEnd: saleEnd.toISOString(),
      }
    },
    template: `
      <div class="bg-red-500 text-white p-6 rounded-lg text-center">
        <h3 class="text-2xl font-bold mb-2">🔥 FLASH SALE</h3>
        <p class="text-lg mb-4">Up to 70% OFF - Limited Time!</p>
        
        <div class="mb-4">
          <Countdown 
            :targetDate="saleEnd" 
            size="lg"
            :showLabels="true"
            :showDays="false"
            class="text-white"
          />
        </div>
        
        <p class="text-sm opacity-90">Sale ends in:</p>
        
        <div class="mt-4">
          <button class="btn btn-white btn-lg">Shop Now</button>
        </div>
      </div>
    `,
  }),
}
